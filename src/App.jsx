import { Routes, Route } from 'react-router-dom';

import { NoteProvider } from './contexts/noteContext';
import Path from './paths';

import HeaderPage from './components/HeaderPage';
import Home from './components/home/Home';
import NoteCreate from './components/note-create/NoteCreate';
import NoteList from './components/note-list/NoteList';
import NoteDetails from './components/note-details/NoteDetails';
import NoteEdit from './components/note-edit/NoteEdit';
import FooterPage from './components/FooterPage';

import { Layout } from 'antd';
const { Content } = Layout;

function App() {

  return (
    <NoteProvider>
      <Layout>
        <HeaderPage />
        <Content className='content'>
            <div className='content-section'>
                <Routes>
                <Route path={Path.Home} element={<Home />} />
                <Route path={Path.Notes} element={<NoteList />} />
                <Route path={Path.NoteCreate} element={<NoteCreate />} />
                <Route path={Path.NoteDetails} element={<NoteDetails />} />
                <Route path={Path.NoteEdit} element={<NoteEdit />} />
                </Routes>
            </div>
        </Content>
        <FooterPage />
      </Layout>
    </NoteProvider>
  );
}

export default App;