<template>
    <div class="harvest_probe_container">
        <div class="harvest_probe_body">
            <img
                class="harvest_probe_img"
                :class="{ is_password: type === 'password' }"
                src=""
                alt=""
                draggable="false"
            />
            <div class="harvest_probe_dash">
                <img style="height: 100%;position: absolute;left: 0;" src="../../dash/x_dash.png" alt="">
            </div>
            <img
                class="harvest_probe_hand_img"
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
.harvest_probe_container{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    /* border: 1px solid red; */
}
.harvest_probe_body{
    display: block;
    position: absolute;
    left: 10%;
    height: 100%;
    width: 80%;
    /* border: 1px solid red; */
}
.harvest_probe_img{
    position: absolute;
    left: 0;
    bottom: -29%;
    height: 150%;
    content: var(--harvest-probe-default-src);
}
.harvest_probe_hand_img{
    position: absolute;
    left: 0;
    bottom: -29%;
    height: 150%;
    content: var(--harvest-probe-hand-src);
}
.is_password{
    content: var(--harvest-probe-password-src);
}
.harvest_probe_dash{
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 5%;
    /* border: 1px solid red; */
}
</style>
