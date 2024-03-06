<template>
    <CHeader position="fixed">
        <CHeaderBrand href="#">CAPE Tool</CHeaderBrand>
    </CHeader>

</template>

<script>
import {
    CHeader,
    CHeaderBrand,
} from '@coreui/vue';
import '@coreui/coreui/dist/css/coreui.min.css';

export default {
    name: 'HeaderSection',
    components: {
        CHeader,
        CHeaderBrand,
    },
};

</script>
