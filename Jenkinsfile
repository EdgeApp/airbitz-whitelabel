def global = [:]

def preBuildStages(String stageName, versionFile) {
  stage("${stageName}: preBuildStages") {
    echo "Running on ${env.NODE_NAME}"
    deleteDir()
    checkout scm

    def versionString = "${versionFile.branch} ${versionFile.version} (${versionFile.build})"
    echo "versionString: ${versionString}"
    writeJSON file: './release-version.json', json: versionFile
    currentBuild.description = versionString

    sh 'yarn'

    // Import the settings files
    withCredentials([file(credentialsId: 'githubSshKey', variable: 'id_github')]) {
        sh "cp ${id_github} ./id_github"
    }

    sh "node -r sucrase/register ./scripts/secretFiles.ts ${BRANCH_NAME} ${SECRET_FILES}"
    sh "node -r sucrase/register ./scripts/patchFiles.ts airbitz ${BRANCH_NAME}"

    // Pick the new build number and version from git:
    sh 'node -r sucrase/register ./scripts/updateVersion.ts'

    sh 'yarn prepare'
  }
}

def buildProduction(String stageName) {
  stage("Build ${stageName}") {
    echo "Running on ${env.NODE_NAME}"
    if (env.BRANCH_NAME in ['airbitz']) {
      if (stageName == 'ios' && params.IOS_BUILD) {
        sh 'npm run prepare.ios'
        sh "node -r sucrase/register ./scripts/deploy.ts airbitz ios ${BRANCH_NAME}"
      }
      if (stageName == 'android' && params.ANDROID_BUILD) {
        sh "node -r sucrase/register ./scripts/deploy.ts airbitz android ${BRANCH_NAME}"
      }
    }
  }
}

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
  parameters {
    booleanParam(name: 'ANDROID_BUILD', defaultValue: true, description: 'Build an Android version')
    booleanParam(name: 'IOS_BUILD', defaultValue: true, description: 'Build an iOS version')
    booleanParam(name: 'VERBOSE', defaultValue: false, description: 'Complete build log output')
  }
  environment {
    LC_CTYPE = 'en_US.UTF-8'
    DISABLE_XCPRETTY = "${params.VERBOSE}"
  }

  stages {
    stage('Preparation') {
      agent { label 'ios-build || android-build' }
      steps {
        script {
          echo "Running on ${env.NODE_NAME}"
          deleteDir()
          checkout scm

          // Import the settings files
          withCredentials([file(credentialsId: 'githubSshKey', variable: 'id_github')]) {
            sh "cp ${id_github} ./id_github"
          }

          // Use npm to install Sucrase globally
          sh 'yarn add --dev sucrase'
          sh "node -r sucrase/register ./scripts/gitVersionFile.ts ${BRANCH_NAME}"

          def versionFile = readJSON file: './release-version.json'
          global.versionFile = versionFile
          echo "Created version file: ${global.versionFile.branch} ${global.versionFile.version} (${global.versionFile.build})"
        }
      }
    }

    stage('Parallel Stage') {
      parallel {
        stage('IOS Build') {
          agent { label 'ios-build' }
          steps {
            script {
              preBuildStages('IOS', global.versionFile)
              buildProduction('ios')
            }
          }
        }
        stage('Android Build') {
          agent { label 'android-build' }
          steps {
            script {
              preBuildStages('Android', global.versionFile)
              buildProduction('android')
            }
          }
        }
      }
    }
  }

  post {
    success {
      echo 'The force is strong with this one'
    }
    unstable {
      echo 'Do or do not there is no try'
    }
    failure {
      echo 'The dark side I sense in you.'
    }
  }
}
