import AddSongForm from './addSongForm';

const CreateSongForm = () => {
  const song = {
    title: '',
    description: '',
    url: '',
    previewImage: '',
    albumTitle: ''
  };

  return (
    <AddSongForm song={song} formType="New Song" />
  );
}

export default CreateSongForm;
