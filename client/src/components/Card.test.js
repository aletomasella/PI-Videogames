import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react"; //Permite renderizar un componente y ver que se fue renderizado.
// import { prettyDOM } from "@testing-library/react";
import Card from "./Card";

describe("<Card/>", () => {
  const game = {
    name: "Tomb Rider",
    genres: ["RPG", "Action"],
    img: "",
  };

  let component;

  beforeEach(() => {
    component = render(
      <Card name={game.name} genres={game.genres} img={game.img} />
    );
  }); //Aca lo que  hago es que me evito estar escribiendo el render para cada test. Esto se va a ejecutar de manera automatica antes de cada test.

  test("Renderiza el nombre recibido", () => {
    component.getByText(`Nombre : ${game.name}`); //Prueba que renderiza el nombre pasado.

    // expect(component.container).toHaveTextConent(`Nombre : ${game.name}`); Esta seria otra forma con el expect.
    // component.debug(). Este metodo te permite ver que esta renderizando el componente. MUY UTIL.
    // const img = component.container.querySelector("img"); Aca accedo a la propiedad conteiner del componente y me quedo con el elemento img.
    // console.log(prettyDOM(img)); Aca con el metodo prettyDOM veo que esta renderizando la img del componente.
  });

  test("Renderiza los generos recibidos", () => {
    component.getByText(`Generos : ${game.genres.join(" ")}`); //Prueba que renderiza los generos pasados como props.
  });

  test("Debe mostrar la imagen por defecto si no recibe una imagen por props o sino mostrar la imagen recibida", () => {
    const img = component.container.querySelector("img");
    expect(img.src).toBe(
      "https://blogdigital.es/wp-content/uploads/2015/09/imagen-no-encontrada.jpg"
    );
  }); //Aca estoy accediendo a el atributo src de la img del component.

  test("Debe mostrar la imagen recibida", () => {
    const gameWithImg = {
      name: "Tomb Rider",
      genres: ["RPG", "Action"],
      img: "http://localhost/algunaimagen",
    };
    component = render(
      <Card
        name={gameWithImg.name}
        genres={gameWithImg.genres}
        img={gameWithImg.img}
      />
    );
    const img = component.container.querySelector("img");
    expect(img.src).toBe(gameWithImg.img);
  });
});

//Para probar eventos se utiliza fireEvent de react testing library. fireEvent.click(El elemento a probar).
//Y normalment se le pasa como prop a lo que se quiere probar una funcion mock que se obtiene const mockHandler = jest.fn().
//Y para probar si el mock fue llamado seria expect(mockHandlar).toHaveBeenCalledTimes(1).
