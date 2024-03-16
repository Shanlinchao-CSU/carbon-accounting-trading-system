<!-- probe for login and register -->
<template>
    <div class="probe_for_LAR_harvest_container">
        <div class="harvest_probe_body">
            <img
                class="harvest_probe_img"
                :class="{ is_password: type === 'password' }"
                src=""
                alt=""
                draggable="false"
            />
            <img class="harvest_probe_hand_img" draggable="false" />
        </div>
    </div>
</template>

<script>
export default {
    props: ["type"],
};
</script>

<style scoped>
.probe_for_LAR_harvest_container {
    position: relative;
    width: 100%;
    /* max-width: 700px; */
    height: 200px;
    /* border: 1px solid red; */
}
.harvest_probe_body {
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    /* border: 1px solid red; */
}
.harvest_probe_img {
    /* border: 1px solid red; */
    position: absolute;
    left: 0;
    bottom: -28%;
    width: 100%;
    content: var(--harvest-probe-default-src);
}
.harvest_probe_hand_img {
    position: absolute;
    left: 0;
    bottom: -28%;
    width: 100%;
    content: var(--harvest-probe-hand-src);
}
.is_password{
    content: var(--harvest-probe-password-src);
}
</style>
