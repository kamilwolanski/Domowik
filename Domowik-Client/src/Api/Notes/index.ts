import api from '../index';
import { Note, updateNote } from './types';

export const getNotes = async () => {
    const response = await api.get<Note[]>('/notes');

    return response.data;
};

export const getNote = async (id: number) => {
    const response = await api.get<Note>(`/notes/${id}`);

    return response.data;
};

export const deleteNote = async (id: number) => {
    const response = await api.delete(`/notes/${id}`);

    return response;
};

export const editNote = async (variables: {
    id: number;
    body: updateNote;
}) => {
    const response = await api.put(
        `/notes/${variables.id}`,
        variables.body,
    );

    return response;
};

export const createNote = async (body: Note) => {
    const response = await api.post('/notes', { ...body });

    return response;
};
