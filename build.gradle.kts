plugins {
  id("com.android.application")

 id("com.google.gms.google-services") version "4.4.2" apply false


  }

  dependencies {
 
  implementation(platform("com.google.firebase:firebase-bom:33.13.0"))

}