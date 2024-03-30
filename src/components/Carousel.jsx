import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import AgrupacionCard from "./AgrupacionCard";
import { getGroupsArray } from "../pages/groups"; 
import { useEffect, useState } from "react";
import HomeCard from "./HomeCard";



export default function Carousel() {
  const [agrupaciones, setAgrupaciones] = useState([]);

  useEffect(() => {
      const fetchAgrupaciones = async () => {
          try {
              const arrayAgrupaciones = await getGroupsArray();
              setAgrupaciones(arrayAgrupaciones);
          } catch (error) {
              console.error("Error al obtener las agrupaciones:", error);
          }
      };

      fetchAgrupaciones();
  }, []);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
      <Slider {...settings}>

        <HomeCard></HomeCard>

          {agrupaciones.map(agrupacion => (
              <AgrupacionCard
                  key={agrupacion.key}
                  nombre={agrupacion.value.nombre}
                  descripcion={agrupacion.value.mision}
                  imagen={agrupacion.value.imagen}
              />
          ))}
      </Slider>
  );
}