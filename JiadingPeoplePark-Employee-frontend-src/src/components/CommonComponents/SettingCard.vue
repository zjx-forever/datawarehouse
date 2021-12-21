<template>
  <div class="setting-card">
    <!--清除缓存提示-->
    <alert-messagebox
      alertBody="是否清除存放于LocalStorage中的所有信息(如偏好设置等)？该操作一旦完成，将无法恢复。请确认您目前所有工作已经完成并且提交至服务器。"
      alertTitle="清除本地缓存记录"
      :alertLevel="`warning`"
      ref="clr_ls_msgbox"
      @alertConfirm="clearLocalStorage"
    />

    <v-container>
      <v-row>
        <v-subheader>隐私设置</v-subheader>
      </v-row>
      <v-row>
        <v-col>
          如果您想要删除的所有偏好设置,
          如地区设置和外观设置等。您可以点击右侧的清除本地缓存选项。这将会同时清除您的登陆状态，这一操作一旦完成，将无法恢复。
        </v-col>
        <v-col>
          <v-btn
            block
            class=" strip-bg-slim"
            v-bind="attrs"
            v-on="on"
            color="error"
            @click="calloutClearLsMsg"
          >
            <v-icon>mdi-delete</v-icon>清除本地缓存记录
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import AlertMessagebox from "./AlertMessagebox.vue";

export default {
  components: { AlertMessagebox },
  name: "SettingCard",
  props: {
    drawer: Boolean,
  },
  methods: {
    calloutClearLsMsg() {
      this.$refs.clr_ls_msgbox.showAlert();
    },
    clearLocalStorage() {
      localStorage.clear();
      this.$store.dispatch("showToastNotify", {
        type: "success",
        info: "存储于本地的LocalStorage中的信息已经被清空",
      });
    },
  },
  created() {},
  data() {
    return {};
  },
  computed: {},
};
</script>

<style scoped lang="scss">
.setting-card {
  margin-top: 10px;
  display: block;
  //color:#222222;
  font-size: 16px;
}
</style>
