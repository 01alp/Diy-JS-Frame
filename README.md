![Image Alt text](./toDoMvc/assets/js-diy.png 'Diy Framework XS')

# Diy JavaScript Farame

## OverView

Diy Frame is a simple javascript framework for frontend development.

Diy Frame is not a professional framework and as a result, it does not come with all the features and functionalities that real frameworks have.

## Features

- DOM Routing System
- State Management
- Event Handling
- Create an Element
- Add attributes to an element
- Nest elements
- A todoMVC project using the framework

#### Just go into /toDoMvc folder and Live Preview index.html

# Documentation:

## How it Works:

## Creating Elements:

You can use framework element create method to create an element

```javascript
const element = mf.element.create('section', { class: 'your-section' }, 'Greetings!');
```

1.  HTML tag of the element.
2.  Object of attributes and their values
3.  Children, that can include other virtual Dom elements or text content.

## Adding HTML elements

To add the element into the actual DOM, include the script in your HTML

```javascript
<div>
  <script src="./elements/yourElement.js"></script>
</div>
```

Use the method **mf.insert **for adding elements to the DOM

```javascript
// yourElement.js
(function () {
  // Retrieve the current script element
  const script = document.currentScript;

  // Establish script element and define a rendering function to add new elements
  mf.insert(script, (updater, old_updater) => {
    return [
      mf.element.create(
        'div',
        {
          class: 'div_greeting',
        },
        mf.element.create('p', {}, 'Greetings, Estonia')
      ),
    ];
  });
})();
```

## Adding Event Listeners :

You can easily add event listeners create element in properties

```javascript
mf.element.create(
    "p",  {
        onclick:  (e)  =>  {
            alert("Estonia")
        }
    },
    "Greetings?"
),
```

## Routing :

Create a simple routing mechanism within the framework for handling hash endpoints.

```javascript
mf.rout.create('#/', () => {
  alert('Welcome to the Estonia!');
});

mf.rout.create('#/about', () => {
  alert('This framework is maintained by alpbal');
});
```

## State Management :

Create an object to hold data, which can be linked for automatic re-rendering of elements using the (mini framework)mf.data.bind method

```javascript
// data.js
const data = {
  greeting: 'Estonia',
};
```

```javascript
// Element.js
(function () {
  // Save the current script element
  const script = document.currentScript;
  // Invoke the framework
  // Set up the script element and define a rendering function to insert new elements
  mf.insert(script, (updater, old_updater) => {
    // Bind the updater to a specific data key
    mf.data.bind('greeting', updater);
    // Binding "greeting" to "updater" will destroy and re-render the element below
    return [
      mf.element.create(
        'div',
        {
          class: 'div_greeting',
        },
        mf.element.create(
          'p',
          {},
          'Greetings, ' + mf.data.get('greeting') // data.greeting can work too
        )
      ),
    ];
  });
})();
```

Now elements are set to data you can update this data to refresh render.

```javascript
// Input.js
(function () {
  // Save the current script element
  const script = document.currentScript;
  // Invoke the framework
  mf.insert(script, (updater, old_updater) => {
    return [
      mf.element.create('input', {
        class: 'greeting_class',
        type: 'text',
        value: mf.data.get('greeting'), //data.greeting can work
        oninput: (e) => {
          mf.data.update('greeting', (lastValue) => {
            if (e.data) {
              return lastValue + e.data;
            } else {
              return lastValue.slice(0, -1);
            }
          });
        },
      }),
    ];
  });
})();
```

Don't forget to check ToDoMvc example!
Thanks for reading !
