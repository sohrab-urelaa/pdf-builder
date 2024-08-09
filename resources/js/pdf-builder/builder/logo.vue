<template>
    <div className="flex items-center space-x-2">
        <a :href="link" className="flex items-center space-x-2">
            <img
                :src="logoLink"
                className="w-[50px] h-[50px] rounded-full object-cover"
            />
            <div
                v-if="withSiteName"
                className="text-2xl font-bold text-base-content"
            >
                {{ siteName }}
            </div>
        </a>
    </div>
</template>

<script>
export default {
    name: "ProjectLogo",
    data() {
        return {
            logoLink: "",
            siteName: "",
        };
    },
    props: {
        withSiteName: {
            type: Boolean,
            required: false,
            default: true,
        },
    },
    mounted() {
        const logoLink = window.SITE_SETTINGS?.site_logo;
        const siteName = window.SITE_SETTINGS?.site_name;
        this.logoLink = logoLink;
        this.siteName = siteName;
    },
};
</script>
