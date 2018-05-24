package com.dirsh.feedback.views.list

import android.os.Bundle
import android.support.v4.app.FragmentManager
import android.support.v4.app.FragmentPagerAdapter
import android.support.v4.view.PagerAdapter
import android.support.v4.view.ViewPager
import android.support.v4.view.ViewPager.OnPageChangeListener
import android.support.v7.app.AppCompatActivity
import com.dirsh.feedback.R
import com.dirsh.feedback.enums.MessageType

class ListActivity : AppCompatActivity() {

    private var mPager: ViewPager? = null
    private var mPagerAdapter: PagerAdapter? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_list)
        mPager = findViewById(R.id.pager)
        mPagerAdapter = MessagesPagerAdapter(supportFragmentManager)
        mPager!!.adapter = mPagerAdapter

        mPager!!.addOnPageChangeListener(object : OnPageChangeListener {
            override fun onPageScrollStateChanged(state: Int) {}
            override fun onPageScrolled(position: Int, positionOffset: Float, positionOffsetPixels: Int) {
                val page: RecyclerFragment = supportFragmentManager.findFragmentByTag("android:switcher:" + R.id.pager + ":" + mPager!!.currentItem) as RecyclerFragment
                page.deselectAll() // deselect multiple selection
            }

            override fun onPageSelected(position: Int) {}
        })

        setSupportActionBar(findViewById(R.id.my_toolbar))
    }

    override fun onBackPressed() {
        if (mPager!!.currentItem == 0) {
            super.onBackPressed()
        } else {
            mPager!!.currentItem = mPager!!.currentItem - 1
        }
    }

    private inner class MessagesPagerAdapter(fm: FragmentManager) : FragmentPagerAdapter(fm) {
        override fun getItem(position: Int) = RecyclerFragment.newInstance(MessageType.values()[position])
        override fun getCount() = MessageType.values().size
        override fun getPageTitle(position: Int) = MessageType.values()[position].toString()
    }
}
