let myChart; // Declarar la variable fuera de las funciones para que sea accesible en todo el archivo

function calculateStats(values) {
    const maximo = Math.max(...values);
    const minimo = Math.min(...values);
    const promedio = values.reduce((a, b) => a + b, 0) / values.length;
    console.log(promedio);
    const sortedValues = [...values].sort((a, b) => a - b);
    const middle = Math.floor(sortedValues.length / 2);
    const mediana = sortedValues.length % 2 === 0 ? (sortedValues[middle - 1] + sortedValues[middle]) / 2 : sortedValues[middle];
  
    document.getElementById('maximo').textContent = maximo.toFixed(2);
    document.getElementById('minimo').textContent = minimo.toFixed(2);
    document.getElementById('promedio').textContent = promedio.toFixed(2);
    document.getElementById('mediana').textContent = mediana.toFixed(2);
}

async function fetchData(url) {
  // Si ya hay un gráfico creado, destrúyelo antes de crear uno nuevo
  if (myChart) {
    myChart.destroy();
  }

  const response = await fetch(url, {
    headers: {
      'X-Api-Key': '#oCxIK1ENG$Ym86*cA=RUO(F)HrpfV!+-27&iTwPj^vy'
    }
  });

  if (response.ok) {
    const data = await response.json();
    const dates = data.map(item => item.date);
    const values = data.map(item => item.value);
    calculateStats(values);
    const maximo = Math.max(...values);
    const minimo = Math.min(...values);
    const sum = values.reduce((acc, value) => acc + value, 0);
    const average = sum / values.length;
    const sortedValues = [...values].sort((a, b) => a - b);
    const middle = Math.floor(sortedValues.length / 2);
    const mediana = sortedValues.length % 2 === 0 ? (sortedValues[middle - 1] + sortedValues[middle]) / 2 : sortedValues[middle];


    const maxData = Array(dates.length).fill(maximo);
    const minData = Array(dates.length).fill(minimo);
    const averageData = Array(dates.length).fill(average);
    const medData = Array(dates.length).fill(mediana);

    const ctx = document.getElementById('miGrafico').getContext('2d');
    myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: dates,
        datasets: [
          {
            label: 'Value over Time',
            data: values,
            borderColor: 'violet',
            fill: false, 
          },
          {
            label: 'Promedio',
            data: averageData,
            borderColor: 'yellow',
            pointRadius: 0,
            fill: false, 
          },
          {
            label: 'Maximo',
            data: maxData,
            borderColor: 'green',
            pointRadius: 0, 
            fill: false, 
          },
          {
            label: 'Minimo',
            data: minData,
            borderColor: 'red',
            pointRadius: 0, 
            fill: false, 
          },
          {
            label: 'Mediana',
            data: medData,
            borderColor: 'orange',
            pointRadius: 0, 
            fill: false, 
          },
        ],
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Mi gráfico con un título',
          fontSize: 24,
        },
      },
    });
  } else {
    console.error('Error fetching data', response);
  }
}

// Función para manejar los cambios en el menú desplegable
function handleUrlChange() {
  const selectElement = document.getElementById('urlSelect');
  const selectedUrl = selectElement.value;
  fetchData(selectedUrl);
}

document.addEventListener('DOMContentLoaded', () => {
  // Escucha para los cambios en el menú desplegable
  document.getElementById('urlSelect').addEventListener('change', handleUrlChange);

  // Llama a fetchData para cargar el gráfico inicial
  handleUrlChange();
});

 
  // Suponiendo que 'values' es un array con tus datos

  
  
  
  
  
  