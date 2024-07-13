class Component {
    static create(name, callback) {
      customElements.define(
        name,
        class extends HTMLElement {
          connectedCallback() {
            callback.call(this);
          }
        },
      );
    }
  }
  
  class Khim {
    static nodes = [];
    static state = {};
    static shadow = null;
    //Kiểm tra object
    static isObject(variable) {
      return (
        typeof variable === "object" &&
        !Array.isArray(variable) &&
        variable !== null
      );
    }
  
    //Lặp qua các phần tử con
    static deepChildren(nodes) {
      if (nodes.childNodes?.length) {
        Array.from(nodes.childNodes).forEach((node) => {
          this.nodes.push(node);
          this.deepChildren(node.childNodes);
        });
      }
    }
  
    //Khởi tạo component
    static component(name, options = {}) {
      const _this = this;
      const { data, template } = options;
      if (typeof data !== "function") {
        throw new Error("data require a function");
      }
  
      if (!template) {
        throw new Error("template not empty");
      }
  
      const state = data();
      if (!this.isObject(state)) {
        throw new Error("data return a object");
      }
  
      this.state = state;
  
      const templateEl = document.createElement("template");
      templateEl.innerHTML = template;
      const templateNode = templateEl.content.cloneNode(true);
  
      this.deepChildren(templateNode);
  
      Component.create(name, function () {
        _this.shadow = this.attachShadow({
          mode: "open",
        });
        _this.render();
      });
    }
  
    static render() {
      //Truy cập vào từng node để xử lý
      this.shadow.textContent = "";
      if ([...this.nodes].length) {
        [...this.nodes].forEach((node) => {
          let nodeValue;
          node = node.cloneNode(true);
          nodeValue = node.textContent;
  
          let variables = nodeValue.match(/{{.+?}}/g);
          if (variables?.length) {
            variables.forEach((item) => {
              const variable = item.replace("{{", "").replace("}}", "").trim();
  
              nodeValue = nodeValue.replaceAll(item, this.state[variable]);
            });
          }
  
          node.textContent = nodeValue;
  
          this.addEvent(node);
  
          this.shadow.append(node);
        });
      }
    }
  
    static addEvent(node) {
      const _this = this;
      const attributes = node.attributes;
      if (attributes?.length) {
        Array.from(attributes).forEach((attribute) => {
          if (attribute.nodeName.split(":")[0] === "v-on") {
            const eventName = attribute.nodeName.split(":")[1];
            const eventValue = attribute.nodeValue;
            node.addEventListener(eventName, function () {
              Object.keys(_this.state).forEach((key) => {
                window[key] = _this.state[key];
              });
              const func = new Function(eventValue);
              func.call();
  
              Object.keys(_this.state).forEach((key) => {
                _this.state[key] = window[key];
                delete window[key];
              });
  
              _this.render();
            });
          }
        });
      }
    }
  }