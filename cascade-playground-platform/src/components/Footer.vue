<template>
    <CFooter class="footer" position="fixed">
        <div>
            <CLink href="https://georgefox.edu">CAPE Tool </CLink>
            <span>&copy; 2024 George Fox University</span>
        </div>
        <div>
            <span>Created by </span>
            <CLink href="https://harryzhu.com">Harry</CLink>
        </div>
    </CFooter>
</template>

<script>
import {
    CFooter,
    CLink,
} from '@coreui/vue';
import '@coreui/coreui/dist/css/coreui.min.css';

export default {
    name: 'FooterSection',
    components: {
        CFooter,
        CLink,
    },
};
</script>

<style scoped>

</style>
