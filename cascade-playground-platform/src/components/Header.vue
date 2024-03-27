<template>
    <CHeader id="header-nav" position="fixed">
        <CHeaderBrand id="header" href="#">CAPE Tool</CHeaderBrand>
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

<style scoped>
#header {
    padding: 15px;
}

#header-nav {
    background-color: #223442;
}

a#header.header-brand {
    height: 100%;
    color: #ddd;
}
</style>
