def global = [:]

pipeline {
  agent none

  tools {
    jdk '17'
    nodejs '18'
  }
  options {
    timestamps()
    skipDefaultCheckout true
    overrideIndexTriggers false
    buildDiscarder logRotator(artifactDaysToKeepStr: '', artifactNumToKeepStr: '', daysToKeepStr: '7', numToKeepStr: '10')
    disableConcurrentBuilds()
  }
  triggers {
    pollSCM('H/2 * * * *')
  }
  environment {
    LC_CTYPE = 'en_US.UTF-8'
  }

  stages {
    stage('iOS Build') {
      agent { label 'ios-build' }
      steps {
        echo "Running on ${env.NODE_NAME}"
        deleteDir()
        checkout scm

        // Import the settings files
        withCredentials([file(credentialsId: 'githubSshKey', variable: 'id_github')]) {
          sh "cp ${id_github} ./id_github"
        }

        sh 'yarn'
        sh 'yarn prepare'
        if (env.BRANCH_NAME in ['master']) {
          sh 'npm run prepare.ios'
          sh "node -r sucrase/register ./scripts/deploy.ts ios"
        }
      }
    }
  }
}
