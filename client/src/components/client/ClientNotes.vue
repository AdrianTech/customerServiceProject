<template>
  <div class="clientNotes" v-if="data !== null">
    <h2>{{ data.fullname }}</h2>
    <button @click="addNote">Add note</button>
    <form @submit.prevent="submitNote" class="form" v-if="showAddNote">
      <label>Add text</label>
      <textarea cols="30" rows="10" v-model.trim="body"></textarea>
      <button>Create a note</button>
    </form>
    <div class="notes-list">
      <div class="note" v-for="note in data.notes" :key="note._id">
        <p>{{ note.body }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "ClientNotes",
  components: {},
  data() {
    const { id } = this.$route.params;
    return {
      id,
      data: null,
      showAddNote: false,
      body: ""
    };
  },
  mounted() {
    this.setValues();
  },
  computed: {
    ...mapGetters(["clientData"])
    // watch: () => {
    //   const findClient = this.clientData.find(i => i._id === this.id);
    //   this.data = findClient;
    // }
  },
  methods: {
    ...mapActions(["createNote"]),
    submitNote() {
      const { body, id } = this;
      this.createNote({ body, id });
      setTimeout(() => {
        this.setValues();
      }, 500);
    },
    setValues() {
      const findClient = this.clientData.find(i => i._id === this.id);
      this.data = findClient;
      this.body = "";
    },
    addNote() {
      this.showAddNote = !this.showAddNote;
    }
  }
};
</script>

<style lang="scss" scoped>
.clientNotes {
  padding-top: 80px;
  font-family: $balFont;
  text-align: center;
  button {
    @include primary-btn;
  }
  .form {
    top: 55%;
    border: none;
    textarea {
      border: 2px solid $db-light;
    }
    label {
      font-size: 20px;
      font-weight: 700;
      color: $dark-blue;
    }
  }
}
.notes-list {
  margin-top: 30px;
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;
}
@media (min-width: 500px) {
}
@media (min-width: 768px) {
}
@media (min-width: 1000px) {
}
</style>
