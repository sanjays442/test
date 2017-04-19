The purpose of the guide is to provide examples of best practice in writing code, organizing files, implementing new features and etc., based on the status quo of this particular project. It's for this project only, and may not be suitable for other projects.


#### Why Components
We are employing a component-based structure to build the project. It's essential that we treat every visual element in the page as a component, no matter big or small. But still it's ourselves desicision to make that whether we should write a new component or use plain html code for a specific scenario. It's not a good idea to make things too granular nor a good one to put hundreds of html code in one complicate component. For the first one, we are ending up writing a lot boilerplate code, and the for the second one, it will be of some burden to maintain the code, as we may not know what complications of the change might cause. In principle, when writing a componnet, we want to ensure encapsulation, reusablity and easy maintenance of the component.

#### How To Write A Component
1. Make the name of the component folder in `camel case`.
2. Consider the whole applicaiton as a component with sub-components. Consider every page as a componnet with sub-components. The structure of the application should look like something like:
```
app
  - aboutUs
  - components
  - contactUs
  - sponsorHome
    - cityListBox
    - countyListBox
  - ...
```
3. Put commonly-used component in the `app/components` folder and register it in the angular module `app.components` in the `app/components/index.js`. By 'commonly-used component', it means that the component is used at lease twice in difference page. For example, the `footerAd` is used in many pages.
4. Put page related component in that page folder. E.g. `reviewFormBox` is only used in `treatmentCenterDetail`, then it should be put in `app/treatmentCenterDetail` folder.
5. In each component folder, it should have the following file list:
```
reviewFormBox
  - index.js  (required)
  - view.html (required)
  - ctrl.js   (optional)
  - style.css (optional)
```
5.1 `index.js`
```
// 1. make it simple as possible
// 2. define the interface clearly in bindings if applicable.
module.exports = {
  template: require('./view.html'),
  controller: require('./ctrl'),
  bindings: {         // the interface, how the component interact with others
    centerId: '<',            // one-way binding data
    onSubmitSuccess: '&'      // callback function, similar to event
  }
};
```
5.2 `view.html` - when accessing properties from controller, use `$ctrl`.
5.3. `ctrl.js` - When the component does not require any logic, this file can be omitted. When the component does need logic, the following is example
```
// app/treatmentCenterDetail/reviewFormBox/ctrl.js
// 1. use explicit dependency declaration and put this statement at first line.
module.exports = ['$log', '$rootScope', 'Status', 'TreatmentCenterService', ctrl];
// 2. put the declaration of the `ctrl` function at second line
function ctrl($log, $rootScope, Status, service) {
  // 3. alway assign `this` to `vm` variable. vm is abbrevation of view model
  var vm = this;
  // 4. declare properties first and then give the statement later. It makes
  // code easy to read.
  vm.$onInit = onInit;
  vm.onSubmit = onSubmit;

  function onInit() {
    // logic
  }

  function onSubmit() {
    // logic
  }
}
```
5.4 `style.css` - put page related and sub-component css in one style sheet. In this example,`sponsorHome` has components `cityListBox` and `countyListBox`, so we put `sponsorHome` related css, `cityListBox` related and `countyListBox` relatd css in one `style.css` file.
```
app
  - aboutUs
    - view.html
    - ctrl.js
    - style.css
  - components
  - contactUs
  - sponsorHome
    - cityListBox
      - view.html
      - ctrl.js
    - countyListBox
      - view.html
      - ctrl.js
    - view.html
    - ctrl.js
    - style.css
  - ...
```

#### Navigation
When user clicks an internal link to another page, use API provider by `angular-ui-router` - `$state.go(stateName, params)`.
1. I've defined all the ui state in `uiStateConstants.js` file. Try to use defined constants when you want to navigate to another page.
2. Related files
```
app/components/uiStateConstants.js
app/components/index.js
```
3. Example
```
// app/home/searchByState/ctrl.js
module.exports = ['$state', 'UIState', ctrl];
function ctrl($state, UIState) {
  var vm = this;
  vm.onStateSelect = function (state) {
    // use UIState constant.
    $state.go(UIState.SPONSOR_HOME.STATE, {
      stateName: state.shortname
    });
  };
}
```

#### Visual Feedback
When user have done an operation, we should give visual feedback. Here we are using `$rootScope.$emit` and `$rootScope.$on` to accomplish this feature.
1. Related files
```
app/components/statusConstants.js
app/components/index.js
app/components/statusView
```
2. Example
```
// app/treatmentCenterDetail/reviewFormBox/ctrl.js
// when user have submitted a review successfully.
function submit() {
  ...
  $rootScope.$emit(Status.SUCCEEDED, Status.SUBMIT_SUCCESS_MSG);
  ...
}
```

#### CSS
Currently, stylesheet comes from several sources - `custom.css`, `style.css` in each component folder and third party css files like `bootstrap.css`.
1. `custom.css` - common rules.
2. `style.css` in each component - specific rules for that component view.
  * For common components in `app/components` folder, each component folder should maintain `style.css` itself. (if applicable). E.g.
  ```
  app/components/cardHeading
    - ctrl.js
    - index.js
    - style.css
    - view.html
  ```
  Then in `index.js` file, include the `require` statement in the first line.
  ```
  require('./style.css');
  ```
  * For components (`aboutUs, adListing, ...`) in `app` folder, each component folder should maintain just one `style.css` file.  For example, `app/home` folder has several sub components `featuredTreatmentCenter`, `searchByState`, and `welcome`, the `app/home/style.css` should have all the rules related to these three sub comoponents. These sub component folder do not have to maintain `style.css` file themselves.
  ```
  app/home/style.css
    - featuredTreatmentCenter
      - ctrl.js
      - view.html
      // no style.css. all the css rules go to app/home/style.css file
    - searchByState
      ...
    - welcome
      ...
  ```
3. third party
