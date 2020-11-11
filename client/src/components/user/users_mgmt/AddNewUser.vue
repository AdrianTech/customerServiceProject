<template>
  <div class="addNewUser">
    <h2>Manage your users</h2>
    <Form />
    <button @click="showList = !showList">{{showList ? 'Hide list' : 'Show list of users'}}</button>
    <UserList v-if="showList" />
  </div>
</template>

<script>
import Form from "./AddNewUserForm";
import UserList from "./UserList";
export default {
  name: "AddNewUser",
  data() {
    return {
      showList: false
    };
  },
  components: { Form, UserList }
};
</script>

<style lang="scss" scoped>
.addNewUser {
  text-align: center;
  padding-top: $topPadding;
  font-family: $openSans;
}
button {
  @include primary-btn;
  padding: 5px 10px !important;
  font-size: 15px !important;
  margin: auto;
}
</style>