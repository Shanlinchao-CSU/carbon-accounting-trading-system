<template>
    <div
        class="probe_for_LAR_snow_container"
        :class="{ is_password: type === 'password' }"
    >
        <div class="snow_probe_body">
            <img class="snow_probe_img" src="" alt="" draggable="false" />
        </div>
    </div>
</template>

<script>
export default {
    props: ["type"],
};
</script>

<style scoped>
.probe_for_LAR_snow_container {
    position: absolute;
    height: 100%;
    width: 187px;
    transition: all 0.5s ease-out;
}
.snow_probe_body {
    display: block;
    position: absolute;
    left: 0%;
    top: -11%;
    height: 110%;
    width: 100%;
}
.snow_probe_img {
    position: absolute;
    left: -35%;
    /* bottom: -8%; */
    height: 100%;
    content: var(--snow-probe-default-src);
}
.is_password {
    transition: all 0.5s ease-out;
    left: 80% !important;
}
</style>
