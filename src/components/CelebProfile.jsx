
const CelebProfile = () => {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [balance, setBalance] = useState(1000);

  const handleSave = () => {
    // Handle saving changes to profile
    setEditing(false);
  };

  const handleResetPassword = () => {
    // Handle resetting password
  };

  return (
    <h1>Profile</h1>
  );
};

export default CelebProfile;
