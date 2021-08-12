import axios, { AxiosRequestConfig } from 'axios';
import { configuration } from '../configuration/configuration';
import { CreateNoteDTO } from '../interfaces/create-note.dto';
import { IResponseNote } from '../interfaces/IResponseNote';

export class NoteService {
  static apiUrl = `${configuration.api.uri}/notes`;

  static async create(note: CreateNoteDTO, token: string): Promise<IResponseNote> {
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data: noteEntity } = await axios.post<IResponseNote>(this.apiUrl, note, config);
    noteEntity.date = new Date(noteEntity.date);
    return noteEntity;
  }

  static async findAll(): Promise<IResponseNote[]> {
    const { data: notes } = await axios.get<IResponseNote[]>(`${this.apiUrl}`);
    notes.forEach((note) => (note.date = new Date(note.date)));
    return notes;
  }

  static async findByUserId(token: string): Promise<IResponseNote[]> {
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data: notes } = await axios.get<IResponseNote[]>(`${this.apiUrl}/user/notes`, config);
    notes.forEach((note) => (note.date = new Date(note.date)));
    return notes;
  }

  static deleteById(id: string, token: string): Promise<any> {
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return axios.delete(`${this.apiUrl}/${id}`, config);
  }
}
