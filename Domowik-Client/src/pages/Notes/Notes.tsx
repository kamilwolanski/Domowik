import { Note } from '../../Api/Notes/types';
import NoteElement from './NoteElement';

interface INotes {
    notes: Note[];
}

const Notes: React.FC<INotes> = ({ notes }) => {
    return (
        <div className="mt-10">
            {notes.map((note) => (
                <NoteElement
                    noteEl={note}
                />
            ))}
        </div>
    );
};

export default Notes;