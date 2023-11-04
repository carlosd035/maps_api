let map;
let positions;

async function initMap() {
  positions = [
    { name:"ola",lat: -25.344, lng: 131.031, title: "imovel:1",text:"casa boa" },
    { name: "adeus",lat: 38.736946, lng: -9.142685, title: "imovel:2",text:"casa mt boa" }
  ];

  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  map = new Map(document.getElementById("map"), {
    zoom: 5,
    center: positions[0],
    mapId: "DEMO_MAP_ID",
  });

  for (let i = 0; i < positions.length; i++) {
    const marker = new AdvancedMarkerElement({
      map: map,
      position: positions[i],
      title: `${positions[i].title}`,
    });


    const infowindow = new google.maps.InfoWindow({
      content: positions[i].text,
      ariaLabel: positions[i],
    });

    marker.addListener("click", () => {
      infowindow.open(map, marker);
    });
  }
}

initMap();

document.querySelector('input').addEventListener('change', () => {
  const inputValue = this.value.toLowerCase();
  let position = null;

  for (let i = 0; i < positions.length; i++) {
    if (positions[i].name.toLowerCase() === inputValue) {
      position = positions[i];
      break;
    }
  }

  if (position) {
    map.setCenter(position);
  } else {
    alert("Localização não encontrada.");
  }
});
