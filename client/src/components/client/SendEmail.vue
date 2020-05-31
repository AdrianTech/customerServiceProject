<template>
  <form class="inside" @submit.prevent="sendEmailHandler">
    <label>Send email to {{name}}</label>
    <textarea placeholder="Write your message here..." v-model.trim="message"></textarea>
    <button class="modal-btn">Send</button>
  </form>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "SendEmail",
  props: ["clientID", "name", "email"],
  data() {
    return {
      message: ""
    };
  },
  methods: {
    ...mapActions(["sendEmail", "errHandler"]),
    async sendEmailHandler() {
      const { message, email, clientID } = this;
      const data = {
        email,
        message,
        clientID
      };
      if (message.length < 5 || message.length > 800)
        return this.errHandler({
          msg: "Message must have at least 5 characters. But no more than 800.",
          status: 400
        });
      const res = await this.sendEmail(data);
      if (res) this.$data.message = "";
    }
  }
};
</script>

<style lang="scss" scoped>
.inside {
  @include inside(100%, 100%);
  label {
    font-weight: 700;
  }
  textarea {
    padding: 15px;
    margin: 15px 0;
    font-family: $openSans;
    font-size: 15px;
    width: 100%;
    height: 30%;
  }
}
@media (min-width: 500px) {
  .inside {
    @include inside(80%, 90%);
  }
}
@media (min-width: 768px) {
  .inside {
    @include inside(60%, 90%);
    label {
      font-size: 19px;
    }
    textarea {
      width: 60%;
      font-size: 18px;
    }
  }
}
@media (min-width: 1000px) {
}
</style>