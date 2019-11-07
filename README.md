# FraudBusters Expo App

This is FraudBusters' Expo.io app to build native Android and iOS apps for our submission to the TechToProtect 2019 hackathon.

### Prerequisites
| Prerequisite | Version |
|---|---|
| [Node.js](http://nodejs.org) | `^8.16.2` |
| npm (comes with Node) | `^6.4.1` |
| [Expo CLI](https://docs.expo.io/versions/v35.0.0/get-started/installation/) | `^3.4.1` |
| [Yarn](https://yarnpkg.com/) | `^1.19.1` |

_Updating to the latest releases is recommended_.<br/>

If you have already installed Node.js and Yarn on your system, then run the following commands to verify the installed versions.

```shell script
node -v
npm -v
yarn -v
```

If your versions are lower than suggested, you should update to avoid any issues.

To install project dependencies:

```shell script
yarn install
```

_The Expo API's used in this project should install automatically. If not, you can run the `expo-packages.sh` shell script or open the script in a text editor and run the command in your terminal manually._

### Repo Structure
- `App.tsx`: the TypeScript entry point for the app.
- `/containers`: All React components are defined here. `App.tsx` is the top-level component.

### Setting up your dev environment to contribute
The best way to contribute to this project and maintain a clean copy of this repo is to preform all work on your own forked copy of this repo using a branch other than `master`. To do this:
1. Click the **Fork** button in the top right corner.
2. Once your forked repo is created, click the green **Clone or download** button and copy the URL for your repo.
3. In a terminal, navigate to a folder where you want to store this project. Using the copied URL, clone the repo to your local machine using the following command:
    ```shell script
    git clone https://github.com/<your github user here>/fraudbusters-expo.git
    ```
4. This will create a new folder, `fraudbusters-expo`. Navigate into the folder by typing `cd fraudbusters-expo`.
5. Once in the project folder, run the following command to set up a remote repository:
    ```shell script
    git remote add upstream https://github.com/wjhurley/fraudbusters-expo.git
    ```
6. This `upstream` repository is what you will use to ensure that you have the most recent version of the repo possible.<br>
    To update the repository on your local machine, run:
    ```shell script
    git pull upstream master
    ```
    To update your forked repository with changes made to `upstream`, first pull down changes from `upstream` using the above command, then run:
    ```shell script
    git push origin master
    ```
    You will only ever `pull` from `upstream`, never `push`. Typically you will only `push` to origin, but there might be situations where you need to `pull` from `origin`.
7. Now that your repo is set up and up-to-date, you're ready to contribute! To do this, create a new branch on your local machine with the following command:
    ```shell script
    git checkout -b <some branch name descriptive of what you are working on>
    ```
    A few notes here to help make things easier:
    - We create a new branch so that we keep `master` (the default branch) clean. This makes pulling down changes from `upstream` and updating your forked repository easier.
    - The branch name should typically reflect the changes you are making. If you're adding a new feature to upload photos, a branch name such as `feature/upload-photos` would be appropriate. This makes things easier down the road when you're juggling several branches at the same time.
    - These "work in progress" branches can be pushed up to your forked repository at any time. Pushing them to your repository regularly is a good way to avoid losing work if your machine is unstable or if you frequently use different computers. These branches can then be pulled down whenever necessary. Changes must be committed to push them though. Read below for an explanation on committing changes.
8. Once you have completed work on a bug or feature, you need to commit your changes and push them to your forked repository. The commands to do this are below:
    ```shell script
    # This will add all changes. If you only want to commit some, you will have to add them individually using git add <filename>
    git add .
    # Once you have all changes added, you need to commit them
    git commit -m 'Some brief, but descriptive comment explaining your changes'
    # Now that your commit is created, you can push it to your forked repository. If the branch doesn't exist, you will be asked if you want to create it
    git push origin <your-awesome-branch-name-here>
    ```
    Now your changes are on your forked repository, but you need to create a pull request to have these changes added to the main (`upstream`) repository.
9. Log in to [GitHub](https://github.com) and navigate to your forked repository. You should see a button on the right above the files that says **Create a pull request**. Click this to load the pull request form. Here you can write a more detailed description of the changes made and also review the changes to specific files that will be merged into the project.
10. Once the pull request is submitted, project maintainers will review and (hopefully) approve the pull request.
    - Once approved, your branch will be merged into the `upstream` repository's `master` branch. This is the perfect time to perform a `git pull`/`git push` (step #6) to update your local and forked repositories. Make sure to check out `master` (`git checkout master`) before running the commands from step #6.
    - Your `awesome-branch-name-here` branch can also now be safely deleted and a new branch created from `master` to work on your next big change. You can delete the branch with:
        ```shell script
        git branch -D awesome-branch-name-here
        ```
    - Deleting your old working branch and creating a new one from `master` is a good practice. Other pull requests could be approved and merged while you were working on your changes and not using a new branch can quickly lead to frustration.

**That's it! You're all set to start changing the world, one commit at a time! Feel free to reach out with any questions or concerns.**