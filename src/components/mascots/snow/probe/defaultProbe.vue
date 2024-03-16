<template>
    <div class="snow_probe_container">
        <div class="snow_probe_body">
            <img
                class="snow_probe_img"
                :class="{ is_password: type === 'password' }"
                src=""
                alt=""
                draggable="false"
            />
            <div class="snow_probe_dash">
                <img style="width: 100%;position: absolute;bottom: 0;left: 0;" src="../../dash/y_dash.png" alt="">
            </div>
            <img
                class="snow_probe_hand_img"
                draggable="false"
            />
        </div>
    </div>
</template>

<script>
export default {
    props: ["type"],
};
</script>

<style scoped>
.snow_probe_container{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
}
.snow_probe_body{
    display: block;
    position: absolute;
    left: 0%;
    top: 10%;
    height: 80%;
    width: 100%;
}
.snow_probe_img{
    position: absolute;
    left: -35%;
    bottom: -8%;
    width: 230%;
    content: var(--snow-probe-default-src);
}
.snow_probe_dash{
    position: absolute;
    left: 0;
    bottom: 0;
    height: 100%;
    width: 5%;
}
</style>
