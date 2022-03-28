// const gamesCreation = gamesData.map((game) => createGames(game));
// const gamesCreated = await Promise.all(gamesCreation);

// //Forma con Promise all mas performante para associar.
// const association = gamesCreated.map((game, i) => {
//   return (async function () {
//     await game.addGenre(await getIndex(gamesData[i]));
//   })();
// });

// await Promise.all(association);

// // for (let i = 0; i < gamesData.length; i++) {
// //   await gamesCreated[i].addGenre(await getIndex(gamesData[i]));
// // } // YA FUNCIONA!

//ESTE CODIGO LO USABA PARA CREAR VIDEOJUEGOS QUE ME TRAIA DE LA API EN MI BASE DE DATOS. LO CUAL NO ES NECESARIO!
