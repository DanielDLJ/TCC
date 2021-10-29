# TCC

## Install Docker Engine on Ubuntu

### Uninstall old versions (if you have)
```bash
$ sudo apt-get remove docker docker-engine docker.io containerd runc
```

### Install using the repository
Before you install Docker Engine for the first time on a new host machine, you need to set up the Docker repository. Afterward, you can install and update Docker from the repository.

#### Set up the repository
1. Update the apt package index and install packages to allow apt to use a repository over HTTPS:
    ```bash
    sudo apt-get update
    sudo apt-get install \
        ca-certificates \
        curl \
        gnupg \
        lsb-release
    ```
2. Add Docker’s official GPG key:
    ```bash
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
    ```

3. Use the following command to set up the stable repository. To add the nightly or test repository, add the word nightly or test (or both) after the word stable in the commands below
    ```bash
    echo \
    "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
    $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    ```
#### Install Docker Engine
1. Update the apt package index, and install the latest version of Docker Engine and containerd, or go to the next step to install a specific version:
    ```bash
    sudo apt-get update
    sudo apt-get install docker-ce docker-ce-cli containerd.io
    ```
2. Verify that Docker Engine is installed correctly by running the hello-world image.
    ```bash
    sudo docker run hello-world
    ```

Upgrade Docker Engine

    ```bash
    sudo apt-get update
    ```


## Install Compose on Linux systems

1. Run this command to download the current stable release of Docker Compose:
    ```bash
    sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    ```

2. Apply executable permissions to the binary:
    ```bash
    sudo chmod +x /usr/local/bin/docker-compose
    ```

If the command docker-compose fails after installation, check your path. You can also create a symbolic link to /usr/bin or any other directory in your path.
For example:
```bash
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
```

3. Test the installation.
    ```bash
    docker-compose --version
    ```

## Install Git
1. Check if you don't already have git installed
    ```bash
    git --version
    ```

2. If you don't have git installed: Installing git
    ```bash
    sudo apt-get update
    sudo apt-get install git-all
    sudo apt-get update
    ```

2. Test the installation.
    ```bash
    git --version
    ```

## Clone the project
```bash
git clone https://github.com/DanielDLJ/TCC.git
```

## Build the project / Start Project
```bash
cd TCC
sudo su
docker-compose up --build -d
```

## SQL data
The sample data is located in:
```bash
lastDump.sql
```

## Remove the project / Delete Project
```bash
docker-compose down
docker-compose rm
```

## The running application will look something like this:
![map](/images/map.png)
