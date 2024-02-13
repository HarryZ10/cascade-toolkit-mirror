/* eslint-disable max-len */
/* eslint-disable new-cap */
const express = require('express');
const Cascade = require('cascade-api-node');
const CascadeAuth = require('../credentials.js');
const cascadeAPI = new Cascade('https://cascade.georgefox.edu', CascadeAuth);
// const fs = require('fs');

const router = express.Router();

router.get('/page/:id', async function(req, res, next) {
    // Get the page ID from the route
    const pageId = req.params.id;

    // Convert start and end timestamps from query to Date
    const startTime = new Date(parseInt(req.query.start) * 1000);
    const endTime = new Date(parseInt(req.query.end) * 1000);

    // Read the page details using the ID
    const pageResponse = await cascadeAPI.APICall('read', 'page', pageId)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('No page found');
            throw err;
        });

    const pageObject = pageResponse.asset.page;

    // Convert the page's last modified date to a date object
    const latestModification = new Date(pageObject.lastModifiedDate);

    // Create the object that holds the information of modified blocks and pages
    const response = {
        pageId: pageId,
        pagePath: `https://www.georgefox.edu/${pageObject.path}.html`,
        lastModifiedDate: latestModification,
        lastEditedBlock: '',
        modified: false,
        editor: pageObject.lastModifiedBy,
        modifiedBlocks: [],
    };

    // Derive the block path from the page path
    const pagePath = pageObject.path;
    const pathSegments = pagePath.split('/');
    const lastSegment = pathSegments[pathSegments.length - 1];

    // Replace the last segment with "_assets-" prefix
    const blockPathFolder = '/' + pathSegments.slice(0, -1).join('/') + '/_assets-' + lastSegment;


    const associatedBlocks = await cascadeAPI.readFolder(`www Redesign/${blockPathFolder}`)
        .then((res) => {
            return res.asset.folder.children;
        })
        .catch((err) => {
            res.status(500).send('No folder found');
        });

    for (const block of associatedBlocks) {
        const blockPath = '/' + block.path.path;

        if (block.type == 'block_XHTML_DATADEFINITION') {
            // Attempt to read the associated block, if it exists
            try {
                const blockResponse = await cascadeAPI.readBlock(`www Redesign/${blockPath}`);

                // Get the last modified date
                const blockModifiedDate = new Date(blockResponse.asset.xhtmlDataDefinitionBlock.lastModifiedDate);

                // if our latest modified date from the page is older, then we update it with the
                // block updated date
                if (blockModifiedDate > response.lastModifiedDate) {
                    response.lastModifiedDate = blockModifiedDate;
                    response.editor = blockResponse.asset.xhtmlDataDefinitionBlock.lastModifiedBy;
                    response.lastEditedBlock = blockPath;
                }

                const blockId = blockResponse.asset.xhtmlDataDefinitionBlock.id;

                // if the block modified time is within the specified time period
                // then we update the response block appropriately
                if (blockModifiedDate >= startTime && blockModifiedDate <= endTime) {
                    response.modified = true;
                    response.modifiedBlocks.push({
                        blockId: blockResponse.asset.xhtmlDataDefinitionBlock.id,
                        cascadeLink: `https://cascade.georgefox.edu/entity/open.act?id=${blockId}&type=block`,
                        blockPath: blockPath,
                        lastModifiedDate: blockModifiedDate,
                        editor: blockResponse.asset.xhtmlDataDefinitionBlock.lastModifiedBy,
                    });
                }
            } catch (err) {
                console.error(`No block found or error reading block at ${blockPath}`, err);
            }
        }
    }

    // Return the response to client
    res.status(200).send(response);
});

module.exports = router;
