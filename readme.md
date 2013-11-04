# LESSHat Dev Stack documentation

## Instalation
1. Download lesshat repository
2. `npm install`
3. Code!

## Grunt tasks
1.	`grunt` – for production. It will prompt you for new version, update package.json, bower.json, header inside lesshat.less and also create git tag. Then it builds mixins from mixins folders, test them and also it create prefixed version. Finally it builds documentation. **Don't use it for contribution.**
2.	`grunt contrib` – for contribution. It's the same like the one above, but doesn't prompt you for new version. **Use this for contribution**
3.	`grunt version` – changes version in package.json, bower.json and in lesshat.less and lesshat-prefixed.less files and it also creates git tag. **Don't use it for contribution.**
4.	`grunt generate` – mixin generator. It creates folder, mixin file, test file and also doc file. Please use it for creating new mixins.
5.	`grunt dev` – great for development. It just builds mixins and test them.
6.	`grunt build` – awesome for development. It just builds mixins.


## About mixins
* All mixin source files and tests are in *mixins* folder.
* The mixin source file path pattern is `mixins/%name%/%name%.js` and the test file path pattern is `mixins/%name%/test.js`.
* Mixin source files are CommonJS modules which have functions as their exports.
* The exported function is the argument processing function of the mixin. This function is, by default, used for all browsers.
* LESS Hat Dev Stack automatically handles converting between dash-case and camelCase. So `borderRadius` will be `border-radius` in CSS result.
* Always use camelCase in mixin source files!
* **The best way to learn how to create your own mixins is to learn from the existing ones.**


## Mixins API
* `<mixinName> = fn`  **required!**
	* Function for handling mixin result. It's for all browsers by default. You must return some value.
	* If someone calls mixin without arguments and you don't want to polutte result CSS with empty CSS properties, you can return magic numbers `08121991` and LESS CSS then returns nothing.
	
	**Example:**
	
		var alignSelf = function alignSelf(value) {
  			value = value || 'auto';
  			return value;
		};
		
* `<mixinName>[vendor] = fn`
	* It's the same as above!
	
	**Example:**
	
		alignSelf.ms = function msalignSelf(value) {
  			value = value || 'auto';

  			if (value == 'flex-start') {
    			value = 'start';
  			} else if (value == 'flex-end') {
    			value = 'end';
  			}
  			return value;
		};
	
* `<mixinName>.alias = String | [<alias>, ...]`
	* You can create aliases for your mixins. If you want to use stupid CSS properties names like `shadow` or `anime` you can!
	
	**Example:**
	
		borderRadius.alias = ['rounded', 'bor'];
		
* `<mixinName>.vendors = [<browser>, …]` **required!**
	* In vendors array you specify for which browsers is this mixin supported.
	* W3C is handled by default. Don't specify that.
	
	**Example:**
	
		animation.vendors = ['webkit', 'moz', 'opera'];
		
* `<mixinName>.vendors.vendor = boolean`
	* If you support some sort of syntax, but you don't want it enable by default, you can turn it off with this.
	
	**Example:**
	
		opacity.vendors.ms = false; // Don't want ms filter syntax by default
		
* `<mixinName>.result = {} | String`
	* This is suitable for custom mixins, where you need to change result CSS somehow. It would be better to show it on example.
	
	**Example:**
	
		<mixinName>.result = {
			// This settings change CSS result property
			property: 'filter',
			
			// This setting wrap your result in some code
			value: 'rotate({{ result }})', 
			
			// Sometimes you need to espace your code, because of LESS CSS great architecture. {{ escape_result }} add @{process} for your code
			value: '~"saturate({{ escape_result }})"',
			
			// If CSS result property would be prefixed or not (true is default)
			prefixed: false,
			
			// If you want to strip some charactes. Rarely used. 
			strip: ';',
			
			// Settings above is for all browsers, but you can also do ti just for specific browser
			webkit: {
				property: 'something',
				
				// same as above ...
			},
		}
		
	* In some extreme cases, where result is quite comlicated e.g. keyframes mixin, you need completely custom results. The result is completely up to you! It's not recommended, because it's not testable, but sometimes you have to be a bad guy.
	
		**Example:**
		
			// the result is completely up to you!
			<mixinName>.result = 'result.less'
			
* `<mixinName>.appendCSS = {}`
	* Sometimes you want to add some addition CSS. 
	
	**Example:**
	
		borderRadius.appendCSS = {
			// This is for all browsers
 			all: 'background-clip: padding-box',
 			
 			// You can specified it for specific browser
  			webkit: '-webkit-background-clip: padding-box',
  			moz: '-moz-background-clip: padding'
		};
		
* `<mixinName>.prependCSS = {}`
	* Sometimes you want to add some CSS before mixin result. Properties as same as above.
	
	**Example:**
	
		opacity.prependCSS = {
  			ms: 'zoom: 1',
		};
		

## Full mixin example

		/**
 		* animationName mixin
 		*/

		var animationName = function animationName(value) {
  			return value || 'none';
		};

		/**
 		* For which browsers is this mixin specified
 		*/

		animationName.vendors = ['webkit', 'moz', 'opera'];

		/**
 		* Export mixin
 		*/

		module.exports = animationName;


## LESS-only Mixins
There is definitely a lot of mixins that do not require any JavaScript-based processing of input arguments and a simple LESS file is all that's needed.

You can create mixins/%name%/%name%.less files instead of JavaScript files and their contents will be simply copied to the resulting LESS file.

	.size(@width, @height) {
    	width: @width;
    	height: @height;
	}