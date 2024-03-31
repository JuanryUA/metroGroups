import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import AgrupacionCard from "./AgrupacionCard";
import { getGroupsArray } from "../pages/groups"; 
import { useEffect, useState } from "react";
import HomeCard from "./HomeCard";
import Card from '@mui/material/Card';



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
    className: "center",
    centerMode: true,
    centerPadding: "60px",
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div>
       
      <Slider {...settings}>
        <HomeCard></HomeCard>

          {agrupaciones.map(agrupacion => (
              <AgrupacionCard
                  nombre={agrupacion.value.nombre}
                  descripcion={agrupacion.value.mision}
                  imagen={agrupacion.value.imagen}
                  llave={agrupacion.key}
              />
          ))}
      </Slider>
    </div>
  );
}