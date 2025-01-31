import axios from 'axios';

const API_URL = 'http://localhost:5000'; 
export const sendEmail = async (subject: string, recipients: string, body: string) => {
  try {
    const response = await axios.post(`${API_URL}/sentEmails`, {
      subject,
      recipients,
      body,
      status: 'Sent',
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to send email');
  }
};

