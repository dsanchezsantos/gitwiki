import { useState } from 'react';
import logo from '../assets/github.png'
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { ItemRepo } from "../components/ItemRepo";
import { api } from "../services/api";

import { Container } from "./styles";

export const App = () => {

  const [currentRepo, setcurrentRepo] = useState('')
  const [repos, setRepos] = useState([]);

  const handleSearchRepo = async () => {

    
    const {data} = await api.get(`repos/${currentRepo}`);
    
    if(data.id){
      
      const isExist = repos.find(repo => repo.id === data.id);
      
      if(!isExist) {

        setRepos(prev => [...prev, data]);
        setcurrentRepo('');
        return

      }
    }

  }

  const handleRemoveRepo = (id) => {

    setRepos(repos.filter( (repo) => repo.id !== id ));
    console.log(repos);

  }

  return (
    <div className="App">

      <Container>
        <img src={logo} width={72} height={72} alt='github logo'/>
        <Input value={currentRepo} onChange={(e) => setcurrentRepo(e.target.value)} />
        <Button onClick={handleSearchRepo} />

        {repos ? repos.map(repo => <ItemRepo repo={repo} handleRemoveRepo={handleRemoveRepo} />) : null}
        
      </Container>

    </div>
  );
}
