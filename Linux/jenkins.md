# jenkins

## 运行docker镜像

````shell
sudo gpasswd -a jenkins docker
sudo service jenkins restart
````

## 多个步骤和各种情况

### 多个步骤

````groovy
pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh 'echo "Hello World"'
                sh '''
                    echo "Multiline shell steps works too"
                    ls -lah
                '''
            }
        }
    }
}
````

### 超时后重试

````groovy
pipeline {
    agent any
    stages {
        stage('Deploy') {
            steps {
                retry(3) { # 被重试的步骤，重试三次
                    sh './flakey-deploy.sh'
                }

                timeout(time: 3, unit: 'MINUTES') { # 等待health-check.sh脚本执行最多3分钟，若未完成标记为失败
                    sh './health-check.sh'
                }
            }
        }
    }
}
````

`````groovy
pipeline {
    agent any
    stages {
        stage('Deploy') {
            steps {
                timeout(time: 3, unit: 'MINUTES') { # 重复部署5次但是总共不超多3分钟
                    retry(5) {
                        sh './flakey-deploy.sh'
                    }
                }
            }
        }
    }
}
`````

### 各种问题的后续

````groovy
pipeline {
    agent any
    stages {
        stage('Test') {
            steps {
                sh 'echo "Fail!"; exit 1'
            }
        }
    }
    post {
        always {
            echo 'This will always run'
        }
        success {
            echo 'This will run only if successful'
        }
        failure {
            echo 'This will run only if failed'
        }
        unstable {
            echo 'This will run only if the run was marked as unstable'
        }
        changed {
            echo 'This will run only if the state of the Pipeline has changed'
            echo 'For example, if the Pipeline was previously failing but is now successful'
        }
    }
}
````

## agent定义再哪里执行

```groovy
pipeline {
    agent {
        docker { image 'node:latest' }
    }
    stages {
        stage('Test') {
            steps {
                sh 'node --version'
            }
        }
    }
}
```

## 环境变量

````groovy
pipeline {
    agent any
    
    environment {
        DISABLE_AUTH = 'true'
        DB_ENGINE = 'sqlite'
    }
    
    stages {
        stage('Build') {
            steps {
                sh 'printenv'
            }
        }
    }
}
````

## 清理和通知

### 清理

在post中进行清理

````groovy
pipeline {
    agent any
    
    stages {
        stage('No-op') {
            steps {
                sh 'ls'
            }
        }
    }
    
    post {
        always {
            echo "总是执行"
            deleteDir()
        }
        success {
            echo "成功执行"
        }
    }
}
````

### Email

````
post {
    failure {
        mail to: 'team@example.com',
             subject: "Failed Pipeline: ${currentBuild.fullDisplayName}",
             body: "Something is wrong with ${env.BUILD_URL}"
    }
}
````

## 三个阶段

持续交付的三个阶段：构建、测试、部署

````groovy
pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                echo 'Building'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying'
            }
        }
    }
}
````

## Pipeline 介绍

````groovy
pipeline {
    agent any 

    stages {
        stage('Build') { 
            steps { 
                sh 'make' 
            }
        }
        stage('Test'){
            steps {
                sh 'make check'
                junit 'reports/**/*.xml' 
            }
        }
        stage('Deploy') {
            steps {
                sh 'make publish'
            }
        }
    }
}
````

* `agent` 分配执行者和工作区
* `stage` 描述Pipeline的一个阶段
* `steps` 要运行的步骤
* `sh` 要执行的shell命令
* `junit` 由JUnit插件提供的 用于聚合测试报告的Pipeline步骤

### 入门

````groovy
node { 
    echo 'Hello World' 
}
````

* `node` 在Jenkins环境中分配一个执行器和工作空间
* `echo` 在控制台中输出简单字符























