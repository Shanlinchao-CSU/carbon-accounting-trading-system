<template>
    <div
        class="battery"
        :style="{ width: battery_width_px, height: battery_height_px }"
    >
        <div class="battery_border"></div>
        <div class="level_container">
            <div class="battery_bg">
                <div
                    class="battery_bg_color"
                    :class="{ charging: charging }"
                    :style="{ width: level_width }"
                ></div>
            </div>
            <div class="battery_level">{{ level }}</div>
        </div>
    </div>
</template>

<script>
export default {
    // w=243 h=145
    data() {
        return {
            level: 0,
            level_width: "",
            charging: false,
            battery_width_px: "",
            battery_height_px: "",
        };
    },
    created() {
        if (this.battery_width != null) {
            this.battery_width_px = this.battery_width + "px";
            this.battery_height_px =
                (parseInt(this.battery_width) * 0.6).toString() + "px";
        }
        let ele = this;
        try {
            navigator.getBattery().then(function (battery) {
                ele.updateBatteryStatus(battery);
                battery.addEventListener("chargingchange", function () {
                    ele.updateBatteryStatus(battery);
                });
                battery.addEventListener("levelchange", function () {
                    ele.updateBatteryStatus(battery);
                });
                battery.addEventListener("chargingtimechange", function () {
                    ele.updateBatteryStatus(battery);
                });
                battery.addEventListener("dischargingtimechange", function () {
                    ele.updateBatteryStatus(battery);
                });
            });
        } catch {//
        }
    },
    methods: {
        updateBatteryStatus(battery) {
            let batteryLevel = battery.level * 100;
            let batteryCharging = battery.charging ? "Yes" : "No";
            let batteryTimeRemaining = battery.charging
                ? "Calculating…"
                : this.formatTime(battery.dischargingTime);
            this.level = batteryLevel.toFixed(0);
            this.charging = batteryCharging === "Yes" ? true : false;
            this.level_width = this.level.toString() + "%";
            // console.log(batteryTimeRemaining);
        },
        formatTime(seconds) {
            let hours = Math.floor(seconds / 3600);
            let minutes = Math.floor((seconds - hours * 3600) / 60);
            return hours + " hours, " + minutes + " minutes";
        },
    },
    props: ["battery_width"],
    watch: {
        level() {
            // 监控电池电量
        },
        charging() {
            // 监控充电情况
        },
    },
};
</script>

<style scoped>
.battery {
    position: relative;
    /* border: 1px solid red; */
    width: 243px;
    height: 145px;
    display: flex;
    align-items: center;
}
.battery_border {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.59);
    -webkit-mask-image: url("./img/battery.png");
    -webkit-mask-size: 100%;
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-position: center;
}
.level_container,
.battery_bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 85%;
    height: 100%;
    /* background-color: blue; */
    display: flex;
    justify-content: center;
    align-items: center;
}
.battery_bg {
    position: absolute;
    left: 9%;
    top: auto;
    height: 72%;
    width: 90%;
    border-radius: 10%;
    overflow: hidden;
}
.battery_bg_color {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background-color: rgb(214, 211, 211);
}
.battery_level {
    position: relative;
    font-size: 13px;
    text-align: center;
}
.charging {
    /* background: rgb(0, 255, 0); */
    background-color: rgb(55, 248, 55);
}
</style>
