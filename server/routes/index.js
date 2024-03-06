/* eslint-disable max-len */
/* eslint-disable new-cap */
const express = require('express');
const Cascade = require('cascade-api-node');
const CascadeAuth = require('../credentials.js');
const cascadeAPI = new Cascade('https://cascade.georgefox.edu', CascadeAuth);

const router = express.Router();

router.get('/', async function(req, res) {
    res.status(200).send('Server has started!');
});

router.post('/auth', (req, res) => {
    const apiKey = req.body.apiKey;

    if (!apiKey) {
        return res.status(400).send('API key is required');
    }

    process.env.USER_API_KEY = apiKey;

    res.send('API key stored successfully');
});


router.post('/audit', async function(req, res, next) {
    cascadeAPI.usePath('www Redesign');

    // eslint-disable-next-line object-curly-spacing
    const { pageUrls, startTime, endTime } = req.body;

    // Ensure pageUrls is an array
    if (!Array.isArray(pageUrls)) {
        return res.status(400).send('pageUrls must be an array');
    }

    // Convert start and end timestamps from body to Date
    const startTimeDate = new Date(startTime).getTime();
    const endTimeDate = new Date(endTime).getTime();

    try {
        const results = await Promise.all(pageUrls.map(async (pageUrl) => {
            try {
                // Extract the page path from the URL
                const urlParts = new URL(pageUrl);
                const pagePath = `${urlParts.pathname.replace('.html', '')}`;
                const pageResponse = await cascadeAPI.readPage(pagePath);

                if (pageResponse) {
                    const pageObject = pageResponse.asset.page;

                    // Convert the page's last modified date to a date object
                    const latestModification = new Date(pageObject.lastModifiedDate);

                    // Create the object that holds the information of modified blocks and pages
                    const response = {
                        rel_path: pagePath,
                        cascadeLink: `https://cascade.georgefox.edu/entity/open.act?id=${pageObject.id}&type=page`,
                        url: `https://www.georgefox.edu${pagePath}.html`,
                        lastModifiedDate: latestModification,
                        lastEditedBlock: '',
                        modified: false,
                        editor: pageObject.lastModifiedBy,
                        modifiedBlocks: [],
                    };

                    // Derive the block path from the page path
                    const pathSegments = pagePath.split('/');
                    const lastSegment = pathSegments[pathSegments.length - 1];

                    // Replace the last segment with "_assets-" prefix
                    const blockPathFolder = pathSegments.slice(0, -1).join('/') + '/_assets-' + lastSegment;

                    const associatedBlocks = await cascadeAPI.readFolder(`${blockPathFolder}`);
                    const children = associatedBlocks.asset.folder.children;

                    for (const block of children) {
                        const blockPath = '/' + block.path.path;

                        if (block.type == 'block_XHTML_DATADEFINITION') {
                            const blockResponse = await cascadeAPI.readBlock(`${blockPath}`);

                            // Get the last modified date
                            const blockModifiedDate = new Date(blockResponse.asset.xhtmlDataDefinitionBlock.lastModifiedDate).getTime();

                            // if our latest modified date from the page is older, then we update it with the
                            // block updated date
                            if (blockModifiedDate > response.lastModifiedDate) {
                                response.lastModifiedDate = new Date(blockModifiedDate);
                                response.editor = blockResponse.asset.xhtmlDataDefinitionBlock.lastModifiedBy;
                                response.lastEditedBlock = blockPath;
                            }

                            const blockId = blockResponse.asset.xhtmlDataDefinitionBlock.id;

                            // if the block modified time is within the specified time period
                            // then we update the response block appropriately
                            if (blockModifiedDate >= startTimeDate && blockModifiedDate <= endTimeDate) {
                                response.modified = true;
                                response.modifiedBlocks.push({
                                    blockId: blockResponse.asset.xhtmlDataDefinitionBlock.id,
                                    cascadeLink: `https://cascade.georgefox.edu/entity/open.act?id=${blockId}&type=block`,
                                    blockPath: blockPath,
                                    lastModifiedDate: new Date(blockModifiedDate),
                                    editor: blockResponse.asset.xhtmlDataDefinitionBlock.lastModifiedBy,
                                });
                            }
                        }
                    }

                    // Return response object for the page
                    return response;
                } else {
                    // Handle the case where pageResponse is falsy
                    console.error('No response for page', pageUrl);
                    return null; // Or some error indication
                }
            } catch (error) {
                console.error('Error processing page', pageUrl, error);
                return null; // Return null or some error indication
            }
        }));

        // Filter out any null responses due to errors and not modified ones
        const filteredResponses = results.filter((response) => response !== null);
        const modifiedResponses = filteredResponses.filter((response) => response.modified);

        res.status(200).send(modifiedResponses);
    } catch (error) {
        console.error('An unexpected error occurred:', error);
        res.status(500).send('An error occurred');
    }
});

module.exports = router;
