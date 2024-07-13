Khim.component("counter-app", {
    data: () => {
      return {
        name: "Counter App",
        count: 10,
      };
    },
  
    template: `
      <h1>{{ name }}</h1>
      <h1>Count: {{count}}</h1>
      <button v-on:click="count--">-</button>
      <button v-on:click="count++">+</button>
      <button v-on:dblclick="name='Học lập trình để đi làm'">Change</button>
    `,
  });