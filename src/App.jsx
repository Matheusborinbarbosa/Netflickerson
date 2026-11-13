
import { useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useAuth } from "./context/AuthContext.jsx";
import Navbar from "./components/navbar";
import MovieList from "./components/MovieList";
import Login from "./pages/login";
import Register from "./pages/register";
import Hero from "./components/hero";

function HomePage() {

  const filmes= [
    {
      id: 1,
      titulo: "Breaking Bad",
      ano: 2008,
      genero: "Drama",
      duração:"5 temporadas",
      classificacao: "10+",
      destaque:"Eu não estou em perigo, Skyler. Eu sou o perigo. Um cara abre sua porta e leva um tiro e você pensa que sou eu? Não! Sou eu quem bate na porta.",
      descrição:"Walter White é um modesto professor de química do ensino médio. Quando descobre que tem câncer terminal, ele precisa encontrar uma maneira de garantir o bem-estar da família e toma uma decisão drástica: produzir e comercializar metanfetamina.",
      imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS76DQRaqRHTdKN9Bk2--Qhy1n4uWc8gHtmMvY2PjGAhcesqIr4CwN4mRY&s=10",
      video: "/videos/interestelar.mp4"

    },
    {
      id: 2,
      titulo: "Copa Libertadores da America",
      ano: 2026,
      genero: "Esportes",
      duração:"",
      classificacao: "10+",
      destaque:"Quem sera o libertador da america?",
      descrição:"Times sul-americanos se enfrentam em uma copa historica em busca da gloria eterna",
      imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIsamz2b29kEOQEYIJoZqcrgv1GCADhYgXn9lHlROFTw&s",
      video: "/videos/aranhaverso.mp4"
    },
    {
      id: 3,
      titulo: "Formula 1",
      ano: 2026,
      genero: "Esportes",
      duração:"",
      classificacao: "14+",
      destaque:"Uma pista, 22 pilotos, um trofeu.",
      descrição:"20 pessoas, 22 pistas, apenas um campeão",
      imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5MdQMzSFdA_yBYuJ56I5hyjcHBBfmY9-2YZca4xgopA&s=10",
      video: "/videos/the-batman.mp4"
    },
    {
      id: 4,
      titulo: "NBA",
      ano: 2026,
      genero: "Ficção científica",
      duração:"2h 35min",
      classificacao: "0+",
      destaque:"O destino nas areias.",
      descrição:"Paul Atreides precisa enfrentar desafios em um planeta desértico que guarda o recurso mais valioso do universo.",
      imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlNPrO4YAeqk9AC0xGpLw49ZRrDwAStT-d5h9evazG6w&s=10",
      video: "/videos/duna.mp4"
    },
    {
      id: 5,
      titulo: "Psicopata Americano",
      ano: 2000,
      genero: "Terror psicológico",
      duração:"1h 42min",
      classificacao: "18+",
      destaque:"Por trás da perfeição existe um segredo",
      descrição:"Patrick Bateman é um executivo bem-sucedido de Nova York que esconde uma personalidade violenta por trás de sua aparência impecável.",
      imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyhj1_XH3TIYKQnJmqSljIGE-k-naa2yfOD2hIOt3t_g&s=10",
      video: "/videos/psicopata-americano.mp4"
    }
  ];

  //Guarda o filme atualmente selecionado 

  const [filmesSelecionado, setFilmeSelecionado] = useState(filmes[0]);

  return (
    <>
      <Navbar />
      <Hero filme={filmesSelecionado} />
      <MovieList filmes={filmes} onSelectMovie={setFilmeSelecionado} />
    </>
  );
}

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Register />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
