# Packaging and deploying K8S applications using Helm #

todo-app is the helm chart for the Todo Application.

## References ##

- [Helm Documenation](https://docs.helm.sh/using_helm/)

## Steps to install Application ##

- Run Command

```sh
 ./create_secrets.sh todo-app
 ```

This command will create the namespace _todo-app_ and will create the secrets required, Secrets are kept out of the Helm Chart, the helm chart is for distribution for your clients, secrets such usernames/passwords/identities, should be local to each environment

Once the command is finished you can now run the command

```sh

#do a dry run first
helm install --dry-run architech/todo-app

#if no errors are reported install the chart
helm install architech/todo-app

```

## Tips & trouble shooting ##

I like to open a split terminal (or two terminal windows) with the following two commands running

- watch kubectl get pods --all-namespaces
- watch kubectl get services --all-namespaces

The result is a screen like this that gives me constant feedback on the status of the pods as they are being created!

![Alt text](./readme-images/watch_kubectl.png?raw=true "Docker Hub Dashboard")

---------------

If you get a message about the tiller versions incompatiblity you can use the following command to upgrade your cluster tiller

```sh

helm init --upgrade

```
> NOTE : You want to give Tiller a chance to upgrade a few seconds before trying to run the install command again, using the watches as recommended above will help you get a visual confirmation of when tiller is ready

------------

## Happy Helming! ##