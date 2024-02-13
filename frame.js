// FrameWork (mf) is a Diy JS FrameWork for web app development.

// You can :

//       -Create an element
//       -Create an event
//       -Nest elements
//       -Add attributes to an element
//       -Use routing system
//       -Use state management system

// There is a todoMVC project using this framework.

const _updaters = new Map();
// This Map (_updaters) holds updater functions associated with specific state variables.
// Each entry's key is the name of a state variable, and its value is a Set of functions (updaters).
// These updater functions are intended to be invoked whenever the corresponding state variable changes,
// allowing for reactive updates to the DOM or other dependent components in response to state changes.

//---------------------------------------------------------------------

const _routs = {};
// This object (_routs) serves as a registry for application routes.
// It maps URL hash paths to corresponding handler functions.
// Each property key represents a specific route (path) in the hash part of the URL,
// and its value is a function (handler) that is called to handle requests to that route.
// This routing mechanism allows the application to respond to different URL paths,
// facilitating the creation of a single-page application (SPA) where navigation between
// different parts of the application does not require a full page reload.

//----------------------------------------------------------------
window.addEventListener('hashchange', () => {
  if (_routs[window.location.hash]) {
    _routs[window.location.hash]();
  }
});
// This block sets up a listener for 'hashchange' events on the window object, a common practice in single-page applications (SPAs).
// A 'hashchange' event occurs whenever the hash part of the URL (the part after '#') changes.
// When the hash changes, the listener checks if the new hash corresponds to one of the registered routes in the '_routs' object.
// If a matching route is found (i.e., a property with the current hash exists in '_routs'),
// it invokes the associated handler function. This allows the application to update the displayed content
// or perform other actions in response to the URL change without the need for a full page reload,
// enabling smooth, client-side navigation between different "pages" or views of the application.

//--------------------------------------------------------
const mf = {
  // Fetches an element by its ID, a shorthand for `document.getElementById`.
  id: (id) => document.getElementById(id),
  /**Insert HTMLElement From JS file */

  /**
   * @typedef {} OldElementUpdaterFunction
   * Responsible for dynamically inserting HTML elements into the DOM.
   * This method allows for the creation, update, and management of HTMLElements based on application state or user interaction.
   *
   * @param {HTMLOrSVGScriptElement} parentElement_script - The script element which will act as a reference point in the DOM.
   * The new elements will be inserted right before this script element.
   *
   * @param {{
   *   (updater: Function, old_element_updater: {(old_element_updater: Array<HTMLElement>) => Function}) => Array<HTMLElement>
   * }} createElements
   * @param {Function} createElements - A function that defines how to create the elements. It should:
   *    - Accept two parameters:
   *        1. `updater`: A function that can be called to re-render the elements.
   *        2. `old_element_updater`: A function that provides a mechanism to update or clean up old elements before they are removed or replaced.
   *    - Return an array of HTMLElements that are to be inserted into the DOM.
   *
   * @typedef {Function} OldElementUpdaterFunction - A function that handles the update or cleanup of old elements.
   */

  // Function to insert elements into the DOM based on a parent script element
  insert: (parentElement_script, createElements) => {
    /**@type {Array<HTMLElement>}*/
    var els = [];
    const updater = () => {
      const newElement = createElements(updater, () => {});
      for (const el of els) {
        el.remove();
      }
      for (const el of newElement) {
        parentElement_script.insertAdjacentElement('beforebegin', el);
      }
      els = newElement;
    };
    const old_updater = (f) => {
      return () => {
        const oldElement = els;
        f(oldElement);
      };
    };
    els = createElements(updater, old_updater);
    const insert = () => {
      for (const el of els) {
        parentElement_script.insertAdjacentElement('beforebegin', el);
      }
    };
    insert(); // Initial insertion of elements
    // window.addEventListener("load", insert, {once: true})
    // console.log("data", data);
  },
  // Define the 'element' namespace for creating virtual DOM elements
  element: {
    create: function (tag, props, ...children) {
      /**@type {HTMLElement} */
      const element = document.createElement(tag);

      // Apply properties and event listeners to the element
      if (props) {
        for (const [attr, value] of Object.entries(props)) {
          if (attr.startsWith('on')) {
            const eventType = attr.substring(2).toLowerCase();
            element.addEventListener(eventType, value);
          } else {
            element.setAttribute(attr, value);
          }
        }
      }
      // Append children to the element
      for (const child of children) {
        if (typeof child === 'string') {
          element.innerHTML += child;
        } else {
          if (!child) {
            continue;
          }
          element.append(child);
        }
      }
      return element;
    },
  },
  // Define the 'rout' namespace for URL routing management
  rout: {
    create: function (path, handler) {
      _routs[path] = handler;
    },
    remove: function (path) {
      delete _routs[path];
    },
  },
  // Define the 'data' namespace for state management
  data: {
    set: function (key, value) {
      index(data, key, value);
    },
    get: function (key) {
      return index(data, key);
    },
    update: function (key, fValue = (v) => v) {
      mf.data.set(key, fValue(mf.data.get(key)));
      const onKey = _updaters.get(key);
      if (onKey) {
        for (const updater of onKey.keys()) {
          updater();
        }
      }
    },
    /**
     * @typedef {(old_element_updater: Array<HTMLElement>) => Function} OldElementUpdaterFunction
     */
    /**
     * @param {string} key
     * @param {OldElementUpdaterFunction} updater
     */
    bind: function (key, updater) {
      if (typeof updater !== 'function') return;
      // Get or create a Set for the updater functions associated with the key
      const onKey = _updaters.get(key) || new Set();

      // Add the updater function to the Set
      onKey.add(updater);

      // Update the Map with the Set of updater functions
      _updaters.set(key, onKey);
    },
    remove_bind: function (key, updater) {
      // Get or create a Set for the updater functions associated with the key
      const onKey = _updaters.get(key);

      if (onKey && onKey.has(updater)) {
        onKey.delete(updater);
      }
    },
  },
  // Function to initialize the application by appending nodes to the body
  init: (...nodes) => {
    document.body.append(...nodes);
  },
};
// Utility function to access or modify nested properties of an object
function index(obj, is, value) {
  if (typeof is == 'string') return index(obj, is.split('.'), value);
  else if (is.length == 1 && value !== undefined) return (obj[is[0]] = value);
  else if (is.length == 0) return obj;
  else return index(obj[is[0]], is.slice(1), value);
}
