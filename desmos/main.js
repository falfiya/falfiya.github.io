const c = document.getElementById('calculator');
const options = {
  invertedColors: false,
};
const calculator = Desmos.GraphingCalculator(c, options);
calculator.setExpression({ id: 'graph1', latex: 'y=x^2' });
