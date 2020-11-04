<template>
  <div class="userList">
    <div class="grid" v-if="data.length > 0" :style="data.length === 1 ? 'margin: auto' : null">
      <div class="wrapper" v-for="{ _id, loginname, role, email } in data" :key="_id">
        <div class="item">
          <span class="name">Name</span>
          <span class="value">{{ loginname }}</span>
        </div>
        <div class="item">
          <span class="name">Role</span>
          <span class="value">{{ role }}</span>
        </div>
        <div class="item">
          <span class="name">Email</span>
          <span class="value">{{ email }}</span>
        </div>
        <div class="buttons">
          <button @click="modalHandler(_id)">Update</button>
          <button @click="deleteOne(_id, loginname)">Remove</button>
        </div>
      </div>
      <Modal v-if="updateModal" :modalID="modalID">
        <UserUpdateModal
          :user="{ role: user.role, loginname: user.loginname, id: user._id, email: user.email }"
        />
      </Modal>
    </div>
    <div v-else>
      <h3>You don't have any team member</h3>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Modal from "../../events/Modal";
import { findObj, generateID } from "../../../shared/sharedFunctions";
import UserUpdateModal from "./UserUpdateModal";
export default {
  components: { Modal, UserUpdateModal },
  data() {
    return {
      modalID: generateID(),
      user: null
    };
  },
  mounted() {
    this.getUsers();
  },
  computed: {
    ...mapGetters(["users", "userData", "modals"]),
    data() {
      return this.users.filter(({ _id }) => _id !== this.userData._id);
    },
    updateModal() {
      return findObj(this.modals, this.modalID);
    }
  },
  methods: {
    ...mapActions(["getUsers", "removeUser", "openModal"]),
    deleteOne(id, name) {
      const confirm = window.confirm(`Do you want to delete ${name}`);
      confirm && this.removeUser(id);
    },
    modalHandler(id) {
      this.openModal(this.modalID);
      this.user = this.data.filter(({ _id }) => _id === id)[0];
    }
  }
};
</script>

<style lang="scss" scoped>
.userList,
.wrapper,
.grid,
.item {
  display: grid;
}
.userList {
  margin-top: 20px;
  border-top: 1px solid rgba(0, 0, 0, 0.3);
}
.grid {
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  width: 100%;
  gap: 8px;
}
.wrapper {
  grid-template-columns: 1fr;
  padding: 15px;
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.3);
}
.item {
  grid-template-columns: repeat(2, 1fr);
  padding: 5px;
  margin: 6px;
  border-bottom: 1px solid #00000049;
  color: $dark-blue;
  font-weight: 700;
  .name {
    margin-right: 12px;
  }
}
.buttons {
  margin-top: 15px;
  button {
    @include primary-btn;
    padding: 5px 10px !important;
    font-size: 14px !important;
    &:first-child {
      margin-right: 10px;
    }
  }
}
@media (min-width: 500px) {
  .userList {
    margin: 20px auto;
    padding: 15px;
  }
}
@media (min-width: 768px) {
  .grid {
    justify-content: space-evenly;
  }
  .userList {
    width: 90%;
  }
}
</style>
