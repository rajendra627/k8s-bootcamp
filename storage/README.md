# Storage #

## Volumes ##

For those applications that need to manage durable state, particularly, state that survives across container restarts, K8S provides the volume resource - there are multiple volume types such as NFS, [Azure Disk](https://github.com/kubernetes/examples/tree/master/staging/volumes/azure_disk), [Azure File](https://github.com/kubernetes/examples/blob/master/staging/volumes/azure_file/README.md), and more.   

To the containers, volumes are just directory on the disk.  The Docker image is at the root of the file system, and you can mount multiple volumes at specified paths within the image.  Each container in the pod must independently specify where to mount each volume.  

* See the [Volume reference at K8S.io](https://kubernetes.io/docs/concepts/storage/volumes/) for more details.
* See [here](https://github.com/kubernetes/examples/blob/master/staging/volumes/azure_disk/azure.yaml) for an example of a pod that uses Azure Disk volumes.  Notice how you must first specify the volume, then mount the volume within your container specification.  How you specify the volume depends on the volume type.

## Persistent Volumes & Persistent Volume Claims ##

With Volumes the life-cycle of the storage is tied to the pod.  This means the volume survives container restarts, however, if the pod is destroyed, the volume storage will be blown away. This is not appropriate for applications such as databases that require the data is saved even if the pod is rescheduled to another node.

Persistent Volumes (PV) are a volume type that is pre-provisioned/defined by the cluster admin - they can be provisioned statically or dynamically.  They support different storage services via plugins.  For example, there is a PV type for AzureFile, AzureDisk, NFS and more.  

Persistent Volume Claims (PVC) are how pods "claim" the provisioned storage. In the claim is the request for amount of storage and access modes. A claim is fulfilled if there is a PV that meets the criteria specified in the claim.  Note this means that it is possible for a claim not to be fulfilled.  Once a PVC is bound to a PV, that relationship is one to one. What this means is that even if the Pod is rescheduled, the volume is not reallocated because there is a PVC that claims that volume.  The volume is only reallocated when the PVC is removed.  

See the following example manifests from K8S.io:

* [task-pv-volume.yml](./task-pv-volume.yml)
* [task-pv-claim.yml](./task-pv-claim.yml)
* [task-pv-pod.yml](./task-pv-pod.yml)

*Note: It is very important that you do not remove PVCs indiscriminantly!!! K8S 1.9 does have an alpha feature that will not remove PVCs that are in active use by a pod.  However, this needs to be enabled and prior versions do not have any such safety net.*

*Note: How a PV is reclaimed after a PVC is removed depends on the reclaim policy - Retain, Recycle, Delete. Delete is the most destructive as it also deletes the PV and the underlying backing storage.  Not all storage providers support all policies. See [reclaim policies](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#reclaiming) for details*


## Storage Classes ##

*Note: You only need to be aware of storage classes if you are a cluster admin.*

Storage classes enable cluster admins to define different classes of persistent volumes.  These classes could vary by access modes, reclaim policy, storage provider (e.g. Azure, AWS, NFS, etc) and more.  The cluster admin can also specify a default storage class for those PVCs that do not specify a storage class.  If the cluster admin wants to enable dynamic provisioning of the underlying storage, then they must define storage classes.   

*Note: All cloud providers provide pre-defined storage classes.  You can define others as you see fit for your requirements*

Storage classes also serves to abstract away the underlying storage implementation from the pod. This is beneficial when you have developers using a tool like minikube for development and production uses K8S on a cloud provider like Azure.  Instead of the pod definition being aware of the underlying storage implementation, it can use a PVC that specifies a storage class that uses the same name but different implementation across environments.

To find out what storage classes have been defined for you cluster run:

```
kubectl get storageclasses

#On Azure, this is what is returned

NAME                PROVISIONER
azurefile           kubernetes.io/azure-file
default (default)   kubernetes.io/azure-disk
managed-premium     kubernetes.io/azure-disk
managed-standard    kubernetes.io/azure-disk
```

Notice the default storage class is azure-disk.  This is the class that is used if a PVC does not specify a storage class.  To use a different storage class you would specify the desired storage class in your PVC's ``storageClassName`` attribute.

To get details of a specific storage class run:

```
kubectl describe storageclass/managed-premium
```

To get the details in yaml format run:

```
kubectl get storageclass/managed-premium -o=yaml
```

## References ##

- [Volumes](https://kubernetes.io/docs/concepts/storage/volumes/)
- [Persistent Volumes](https://kubernetes.io/docs/concepts/storage/persistent-volumes/)
- [Storage Classes](https://kubernetes.io/docs/concepts/storage/storage-classes/)
- [Dynamic Volume Provisioning](https://kubernetes.io/docs/concepts/storage/dynamic-provisioning/)