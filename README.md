### Addiction Network Frontend
This is the frontend project of the addiction network Application.

#### Quick start
```
npm install
npm run start
```

#### Deployment
1. First run the following build command.
  ```
  npm run build
  ```

2. Open heroku dashboard and choose the project to manually deploy. (Will use automatic deploy when the build gets stable).

#### Workflow
1. When you start to work on a new feature or try to fix a bug, always checkout a new branch and work on that branch. (e.g. If I am going to work on this new feature - treatment center detail page, I would check out a new branch named treatmentcenterdetail.)
2. When you complete the feature or fixing the bug (by completion, it means you commit all the code needed for that feature or bug fixing locally.), push the branch you are working with to the remote (`git push origin <yourbranchname>`).
3. Go to github, and create a new pull request with the branch you just pushed, and then ask for another party to review the code. During the review and discussion, you may continue work on your branch till it's properly done.
4. Deploy your branch and test it.
5. Merge your branch back to the master branch.

#### How to write a commit message
1. Make it concise and within one line
2. Follow the format 'verb (past tense) + subject'.

#### Referrences
* [How to use Webpack with Angular + templateCache?](http://stackoverflow.com/questions/33300289/how-to-use-webpack-with-angular-templatecache)
* [angularjs 1.6.0 (latest now) routes not working](http://stackoverflow.com/questions/41211875/angularjs-1-6-0-latest-now-routes-not-working)
* [Angular routes contain #! in the url instead of # [duplicate]](http://stackoverflow.com/questions/41334798/angular-routes-contain-in-the-url-instead-of)
* [$location](https://docs.angularjs.org/guide/migration#commit-aa077e8)
* [Understanding the github Flow](https://guides.github.com/introduction/flow/)
* [Github Flow](http://scottchacon.com/2011/08/31/github-flow.html)
* [AngularJS -UploadFile](https://www.tutorialspoint.com/angularjs/angularjs_upload_file.htm)
* [FormData.append()](https://developer.mozilla.org/en-US/docs/Web/API/FormData/append)
* [Styling Broken Image](https://bitsofco.de/styling-broken-images/)
* [Git Clean: Delete Already-Merged Branches](http://stevenharman.net/git-clean-delete-already-merged-branches)
*[How can I delete all git branches which have been merged?](http://stackoverflow.com/questions/6127328/how-can-i-delete-all-git-branches-which-have-been-merged)
* [Set up a minimal, yet useful javescript dev environment](https://dev.to/corgibytes/setting-up-a-minimal-yet-useful-javascript-dev-environment)
* [Understanding Angular’s $scope and $rootScope event system $emit, $broadcast and $on](https://toddmotto.com/all-about-angulars-emit-broadcast-on-publish-subscribing/#rootscopeemitbroadcast)
