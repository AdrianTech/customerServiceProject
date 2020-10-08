<template>
  <div class="clientNotes" v-if="client !== null">
    <h2>{{ client.fullname }}</h2>
    <button @click="addNote">{{showAddNote ? "Hide form" : "Add note"}}</button>
    <form @submit.prevent="submitNote" class="form" v-if="showAddNote">
      <label>Add text</label>
      <textarea v-model.trim="body"></textarea>
      <button :disabled="body.length === 0">Create note</button>
    </form>
    <div class="notes-list" v-if="!showAddNote">
      <div class="note" v-for="note in client.notes" :key="note._id">
        <div class="inside">
          <span>
            Added: {{note.date}}
            <span class="material-icons" @click="deleteNote(note._id)">delete</span>
          </span>
          <p>{{ note.body }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { setClientData } from "../../shared/sharedFunctions";
import moment from "moment-timezone";
export default {
  name: "ClientNotes",
  data() {
    const { id, data, from } = this.$route.params;
    return {
      id,
      data,
      from,
      client: null,
      showAddNote: false,
      body: ""
    };
  },
  mounted() {
    this.setValues();
  },
  computed: {
    ...mapGetters(["clientData", "eventInfo", "currentClientsPage"])
  },
  watch: {
    clientData() {
      this.from = "";
      this.setValues();
      this.showAddNote = false;
    }
  },
  methods: {
    ...mapActions(["createNote", "removeNote"]),
    submitNote() {
      const { body, currentClientsPage, id } = this;
      this.createNote({ body, id, currentClientsPage });
    },
    deleteNote(messageID) {
      const confirm = window.confirm("Delete this note?");
      const data = {
        messageID,
        id: this.id,
        page: this.currentClientsPage
      };
      if (confirm) this.removeNote(data);
    },
    setValues() {
      const guess = moment.tz.guess();
      this.from === "search"
        ? (this.client = this.data)
        : (this.client = setClientData(this.id, this.clientData));
      this.client.notes.forEach(i => {
        i.date = moment(i.date)
          .clone()
          .tz(guess)
          .format("LLL");
      });
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
    width: 100%;
    textarea {
      border: 2px solid $db-light;
      font-size: 17px;
      padding: 5px;
      height: 150px;
    }
    label {
      font-size: 20px;
      font-weight: 700;
      color: $dark-blue;
    }
  }
}
.note {
  border-top: 1px solid $db-light;
  border-bottom: 1px solid $db-light;
  padding: 5px 12px;
  position: relative;
  button {
    font-size: 15px;
    padding: 0 8px;
    margin-left: 10px;
  }
  .inside {
    p {
      font-size: 17px;
      padding: 8px;
    }
    span {
      display: flex;
      align-items: center;
      justify-content: center;
      .material-icons {
        font-size: 21px;
        margin-left: 10px;
        cursor: pointer;
        color: #aa0505;
        opacity: 0;
        transition: opacity 0.4s;
        will-change: opacity;
      }
    }
    &:hover .material-icons {
      opacity: 1;
    }
  }
}
.note + .note {
  border-bottom: none;
}
.notes-list {
  margin-top: 30px;
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;
}
@media (min-width: 500px) {
  .clientNotes .form {
    width: 80%;
    margin: auto;
  }
}
@media (min-width: 768px) {
  .clientNotes .form {
    width: 60%;
    textarea {
      height: 200px;
    }
  }
  .note {
    width: 60%;
    margin: 0 auto;
    .inside {
      p {
        font-size: 19px;
      }
    }
  }
}
</style>
