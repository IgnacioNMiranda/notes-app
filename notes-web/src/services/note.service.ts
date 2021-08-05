import axios from "axios";
import { configuration } from "../configuration/configuration";
import { CreateNoteDTO } from "../interfaces/create-note.dto";
import IResponseGetNote from "../interfaces/IResponseGetNote";

export class NoteService {
  static apiUrl = `${configuration.api.uri}/note`;
  static async create(note: CreateNoteDTO) {
    const { data: noteEntity } = await axios.post<IResponseGetNote>(
      `${this.apiUrl}`,
      note
    );
    noteEntity.date = new Date(noteEntity.date);
    return noteEntity;
  }

  static async findAll(): Promise<IResponseGetNote[]> {
    const { data: notes } = await axios.get<IResponseGetNote[]>(
      `${this.apiUrl}`
    );
    notes.forEach((note) => (note.date = new Date(note.date)));
    return notes;
  }

  static deleteById(id: string): Promise<any> {
    return axios.delete(`${this.apiUrl}/${id}`);
  }
}
