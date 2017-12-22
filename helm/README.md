# Packaging and deploying K8S applications using Helm #

todo-app is the helm chart for the Todo Application.  See [Day1/exercise1](../bootcamp/day1/exercise1.md) for instruction on how to deploy it to K8S.

## References ##

- [Helm Documenation](https://docs.helm.sh/using_helm/) 


## Steps to install Application
- Run Command
```
 ./create_secrets.sh todoapp
 ```

This command will create the namespace _todoapp_ and will create the secrets required, Secrets are kept out of the Helm Chart, the helm chart is for distribution for your clients, secrets such usernames/passwords/identities, should be local to each environment

Once the command is finished you can now run the command
```
helm install --name my_dpeloyment_name architech/todo-app
```

## Tips & trouble shooting

I like to open a split terminal (or two terminal windows) with the following two commands running
* watch kubectl get pods --all-namespaces
* watch kubectl get services --all-namespaces
The result is a screen like this that gives me constant feedback on the status of the pods as they are being created!

![Alt text](./readme-images/watch_kubectl.png?raw=true "Docker Hub Dashboard")

---------------

If you get a message about the tiller versions incompatiblity you can use the following command to upgrade your cluster tiller

```
helm init --upgrade
```
> NOTE : You want to give Tiller a chance to upgrade a few seconds before trying to run the install command again, using the watches as recommended above will help you get a visual confirmation of when tiller is ready

------------
# Happy Helming ! 