# Setting Up

This file describes the one-time setup you will need to do before running this code. 

## Package Managers

To setup your development environment, you will need to install several dependencies on your machine. Please refer to 
the section that applies to you to find a good package manager.

## Dependencies

In this class, we will use Maven, a build tool for Java, and npm, a dependency manager for JavaScript development.
The following section will describe the installation process for these tools. **The lab machines already have these tools installed.**

### Java

Whether working with Linux or Mac, we recommend directly downloading a JDK and setting your `JAVA_HOME` environment 
variable rather than installing a JDK with a package manager. Use at least version 8. A JDK may be downloaded from
https://jdk.java.net/ or from [Oracle's Site](https://www.oracle.com/technetwork/java/javase/downloads/index.html).

Once you've downloaded and unpacked your JDK (to a directory like `jdk-11/`), you'll want to add JAVA_HOME to your environment variables.
Restart your terminal, and try to run `java -version`. If correctly installed, you should see the proper version coming 
from the JDK you chose.

Here A link to a [resource](https://docs.oracle.com/cd/E19182-01/820-7851/inst_cli_jdk_javahome_t/#:~:text=a%20Windows%20System-,Install%20the%20JDK%20software.,Program%20Files%5CJava%5Cjdk1.) if you need more info
### Maven

Maven should be available for install through your package manager. 

Binary distributions are available form Maven's [homepage](https://maven.apache.org/)
as well. If you use the binary distribution, make sure to append the `bin/`
directory to your `PATH`, as shown above for Java.

Either way, **setting the `JAVA_HOME` variable as shown above is extremely
important,** as it tells Maven where to look for Java libraries needed to build
your project. 

Restart your terminal, and try to run `mvn --version`. If correctly installed, you should see a report from Maven, 
otherwise, you will either receive and error, or nothing.

### NPM

#### Installing with [NVM](https://github.com/creationix/nvm)

Node Version Manager is a great project that helps you install and keep track of different NodeJS versions. Its use is 
recommended, as it supports both Mac and Linux. Follow the instructions on the repository's 
[front page](https://github.com/creationix/nvm). The command below is copied from the [NVM repository's README](https://github.com/creationix/nvm).

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
```

Once NVM has been installed (check with `nvm --version`), you can install the latest LTS release of NodeJS with the 
following:

```bash
nvm install --lts

# See What Got Installed
nvm list

# Check To See If You Have NodeJS and NPM
node -v
npm -v
```

## Run Configurations

We have two configurations for our code. Here is a brief description of each and when you should use them.

### Development

#### Using the Dev Environment

If you don't set the environment variable `CS314_RUN_MODE`, then the run script will default to development mode. To run the 
server in development mode, invoke the run script as is:

```bash
./bin/run.sh
```

This starts two processes:
* the client code running via `npm run devClient` listening on port 3000
* the server code running via `npm run server` listening on port 8000 

Your default browser should open automatically and display the project's
homepage after a few seconds (notice that it is running on `localhost:3000`).
If you see an error banner displayed at the top, it is likely that your JAR is
running on an unexpected port, or is not running at all.

The server listening on port 3000 is the "hot server" which tells the browser
when the code has been changed so it can refresh and get the new code. It
is different from your server which handles API requests from your client,
which listens on port 8000.
