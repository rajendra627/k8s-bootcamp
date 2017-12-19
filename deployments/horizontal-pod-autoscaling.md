# Horizontal Pod Auto-Scaling #

Horizontal Pod Auto Scaling (HPA) is a capability to scale out/in the number of pods based on resource metrics e.g. CPU  Note: stable version of the autocaling API (autoscaling/v1) supports only CPU scaling, beta (autoscaling/v2beta1) supports both CPU and Memory and custom metrics.

In order to use auto-scaling, you should deploy your pods using deployments.  

HPA is a resource and is managed by a controller just like other resources.  

## References ##

* [Horizontal Pod Auto-scale docs](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/)
* [Auto-scaling Algorithm](https://github.com/kubernetes/community/blob/master/contributors/design-proposals/autoscaling/horizontal-pod-autoscaler.md#autoscaling-algorithm)