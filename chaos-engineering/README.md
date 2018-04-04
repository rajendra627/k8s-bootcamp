# Chaos Engineering #

Systems WILL fail. This is an inevitable reality.  In order to engineer systems that are resilient to failure, you need to test how you systems behave in failure scenarios.  Chaos Engineering is a practice where you purposely try to break your system, in a controlled way, to test your systems' resiliency to inevitable failure. 

[Gremlin](https://www.gremlin.com) is a SaaS based tool created by engineers that worked at Amazon and Netflix (a popular framework Chaos Monkey is from Netflix).  It provides native Kubernetes support through deploying agents that will carry out "attacks" on your cluster nodes.  You then specify and execute attack vectors through the Gremlin console.