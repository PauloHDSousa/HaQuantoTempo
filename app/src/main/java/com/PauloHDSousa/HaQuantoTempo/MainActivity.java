package com.PauloHDSousa.HaQuantoTempo;

import android.os.Build;
import android.os.Bundle;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;

import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.AdView;
import com.google.android.gms.ads.MobileAds;
import com.google.android.gms.ads.initialization.InitializationStatus;
import com.google.android.gms.ads.initialization.OnInitializationCompleteListener;

import java.io.IOException;
import java.io.InputStream;

import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        WebView webView = findViewById(R.id.wvMain);


        MobileAds.initialize(this, new OnInitializationCompleteListener() {
            @Override
            public void onInitializationComplete(InitializationStatus initializationStatus) {
            }
        });

        AdView mAdView = findViewById(R.id.adView);
        AdRequest adRequest = new AdRequest.Builder().build();
        mAdView.loadAd(adRequest);

        WebSettings settings = webView.getSettings();
        settings.setDomStorageEnabled(true);
        settings.setDatabaseEnabled(true);

        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.KITKAT) {
            webView.getSettings().setDatabasePath("/data/data/" + webView.getContext().getPackageName() + "/databases/");
        }

        webView.getSettings().setJavaScriptEnabled(true);
        webView.setWebChromeClient(new WebChromeClient());

        try {
            String htmlContent = GetHTMLByCountry();

            webView.loadDataWithBaseURL("file:///android_asset/", htmlContent, "text/html",  "UTF-8","");
        }
        catch (IOException e) {
            e.printStackTrace();
        }
    }

    String GetHTMLByCountry() throws IOException {
        InputStream is = getResources().openRawResource(R.raw.index);
        int size = is.available();

        byte[] buffer = new byte[size];
        is.read(buffer);
        is.close();

        String str = new String(buffer);

        String headerMessage = getString(R.string.header_message);
        String eventDate = getString(R.string.event_date);
        String eventHour = getString(R.string.event_hour);
        String eventName = getString(R.string.event_name);
        String saveButton = getString(R.string.save_button);

        String mainText  = getString(R.string.main_text);
        String requiredFields =  getString(R.string.required_fields);
        String wrongTime =  getString(R.string.wrong_time);

        //Updating the texts based on country
        str = str.replace("#headerMessage", headerMessage);
        str = str.replace("#eventDate", eventDate);
        str = str.replace("#eventHour", eventHour);
        str = str.replace("#eventName", eventName);
        str = str.replace("#save", saveButton);
        str = str.replace("#main_text", mainText);
        str = str.replace("#requiredFields", requiredFields);
        str = str.replace("#wrongTime", wrongTime);

        return str;
    }
}
